import React from 'react';
import Promise from 'bluebird';
import {withInjector} from './provider';
import watch from './watch';

/**
 * Angular resolves for a React component.
 *
 * ```
 * const ReactApp = ({$resoled, count}) => $resolved ? <span>count: {count}</span> : null;
 * ```
 * @param {*} resolves
 */
export default function resolve (resolves) {
  const watchers = Object.keys(resolves).filter(name => requiresWatcher(resolves[name]))

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
        let pendingResolves = Object.keys(resolves).reduce((resolved, prop) => {
          let resolver = resolverFrom(resolves[prop]).slice()
          let resolve = resolver.pop()
          let deps = resolver.map(dep => this.props.$injector.get(dep))

          resolved[prop] = resolve(...deps)
          return resolved;
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

function resolverFrom (resolver) {
  return resolver.resolver || resolver;
}

function requiresWatcher (resolver) {
  return !!resolver.watch
}
