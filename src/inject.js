import React from 'react';
import PropTypes from 'prop-types';
import compose from './compose';
import {withInjector} from './injectorProvider';
import {withScope} from './scopeProvider';
import {ensureRootDigest} from './digest';

const connect = compose(withInjector, withScope);

/**
 * Injects Angular dependencies into a React component through props.
 *
 * Eg
 * ```
 * const ConnectedComponent = inject(
 *   'depA',
 *   'depB',
 * )(UnconnectedComponent)
 *
 * // renders:
 * // <ConnectedComponent /> → <UnconnectedComponent depA={depInstanceA} depB={depInstanceB} />
 * ```
 *
 * @param {string} deps A variadic list of dependencies to inject
 * @returns {Function} The higher order component with the resolved dependencies provided as props.
 */
export default function inject (...deps) {
  return WrappedComponent => {
    class InjectedAngularComponent extends React.Component {
      // The resolved dependency injections
      $dependencies = {};

      constructor (props, context) {
        super(props, context);

        // Resolve all the dependencies.
        this.$dependencies = deps.reduce((injections, dependencyName) => {
          let bind = false;
          if (typeof dependencyName === 'object') {
            bind = !!dependencyName.bind
            dependencyName = dependencyName.dep;
          }
          let dependency = props.$injector.get(dependencyName)

          if (bind) {
            // Dependencies with APIs will not be invoked by the React component within angular's digest cycle.
            // Decorated the API with a digest-cycle proxy.
            dependency = withDigestExecutionContext(dependency, props.$scope);
          }

          injections[dependencyName] = dependency;
          return injections;
        }, {});
      }

      componentWillUnmount() {
        this.props.$scope.$destroy();
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            // Provide the resolved dependencies to the lower order component as props
            {...this.$dependencies}
          />
        )
      }
    }

    return connect(InjectedAngularComponent);
  };
}

inject.bind = dep => ({
  dep,
  bind: true
})

/**
 * Creates a digest cycle execution context around a dependency.
 *
 * @param {Object|Function} subject A subject to run within the digest cycle.
 * @param {Object} $scope The scope that will execute within.
 * @returns {Object} The dependency within a digest cycle execution context.
 */
function withDigestExecutionContext (subject, $scope) {
  let digestExecutionContextHandler = {
    get (obj, prop) {
      let target = obj[prop];

      // If the field is a function, return a new function in its place
      // that will call the original function within the digest cycle.
      if (typeof target === 'function') {
        return (...args) => {
          const result = target.call(target, ...args);
          // Make sure changes always propagate through entire application.
          ensureRootDigest($scope);
          return result;
        }
      }

      // If the field is an array, do nothing.
      if (Array.isArray(target)) {
        return target
      }

      // If the field is an object, recurse.
      if (typeof target === 'object') {
        return withDigestExecutionContext(target, $scope);
      }

      // Otherwise, do nothing.
      return target;
    }
  }
  return new Proxy(subject, digestExecutionContextHandler)
}
