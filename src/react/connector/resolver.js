import React from 'react';
import Promise from 'bluebird';
import withInjector from './withInjector';
import watch from './watch';

/**
 * Angular resolves for a React component.
 *
 * ```
 * const ReactApp = ({$resoled, count}) => $resolved ? <span>count: {count}</span> : null;
 * ```
 * @param {*} resolveMap
 */
export default function resolve (resolveMap) {
  const watchers = Object.keys(resolveMap).filter(resolverName => {
    let resolver = resolveMap[resolverName];
    if (typeof resolver !== 'object' || Array.isArray(resolver)) {
      return false;
    }
    return resolver.watch
  });
  const withWatchers = watch(watchers);

  return WrappedComponent => {
    if (watchers.length > 0) {
      let withWatchers = watch(watchers)
      WrappedComponent = withWatchers(WrappedComponent)
    }

    class ComponentWithResolves extends React.Component {
      state = {
        $resolves: {},
        $resolved: false,
        $failed: false
      }

      componentDidMount() {
        let pendingResolves = Object.keys(resolveMap).reduce((resolves, prop) => {
          let resolver = withoutWatch(resolveMap[prop])
          let deps = resolver
            .slice(0, resolver.length - 1)
            .map(dep => this.props.$injector.get(dep));

          let resolve = resolver[resolver.length - 1];

          resolves[prop] = resolve(...deps)
          return resolves;
        }, {});

        Promise.props(pendingResolves)
          .then($resolves => this.setState({
            $resolves,
            $resolved: true
          }))
          .catch((error) => {
            console.warn('[angular-react] failed to resolve', error);
            this.setState({$failed: true});
          })
      }

      render() {
        if (!this.state.$resolved) {
          return null;
        }

        return (
          <WrappedComponent
            {...this.props}
            {...this.state.$resolves}
          />
        )
      }
    }

    return withInjector(ComponentWithResolves);
  }
}

resolve.watch = function watch (resolver) {
  return {
    watch: true,
    resolver
  };
};

function withoutWatch (resolver) {
  return resolver.resolver || resolver;
}