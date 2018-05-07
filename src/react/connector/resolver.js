import React from 'react';
import Promise from 'bluebird';
import withInjector from './withInjector';

/**
 * Angular resolves for a React component.
 *
 * ```
 * const ReactApp = ({$resoled, count}) => $resolved ? <span>count: {count}</span> : null;
 * ```
 * @param {*} resolveMap
 */
export default function resolve (resolveMap) {
  return WrappedComponent => {
    class ComponentWithResolves extends React.Component {
      state = {
        $resolves: {},
        $resolved: false,
        $failed: false
      }

      componentDidMount() {
        let pendingResolves = Object.keys(resolveMap).reduce((resolves, prop) => {
          let deps = resolveMap[prop]
            .slice(0, resolveMap[prop].length - 1)
            .map(dep => this.props.$injector.get(dep));

          let resolver = resolveMap[prop][resolveMap[prop].length - 1];

          resolves[prop] = resolver(...deps)
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
