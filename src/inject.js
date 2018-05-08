import React from 'react';
import PropTypes from 'prop-types';
import {withInjector} from './provider';

/**
 * Connect a React component to the Angular runtime.
 *
 * const ConnectedComponent = inject(
 *   'depA',
 *   'depB',
 * )(UnconnectedComponent)
 *
 * // renders:
 * // <UnconnectedComponent depA={depInstanceA} depB={depInstanceB} />
 * @param {*} deps
 */
export default function inject (...deps) {
  return WrappedComponent => {
    class InjectedAngularComponent extends React.Component {
      static contextTypes = {
        $ng: PropTypes.object
      }
      $injections = {};

      constructor (props, context) {
        super(props, context);

        const $rootScope = props.$injector.get('$rootScope');
        const $applyScope = $rootScope.$new();

        this.$injections = deps.reduce((injections, dep) => {
          injections[dep] = withDigest(props.$injector.get(dep), $applyScope)
          return injections;
        }, {});
      }

      render() {
        return (
          <WrappedComponent {...this.props} {...this.$injections} />
        )
      }
    }

    return withInjector(InjectedAngularComponent);
  };
}

function withDigest (api, $scope) {
  let digestExecutionContext = {
    get (obj, prop) {
      let target = obj[prop]

      if (typeof target === 'function') {
        return (...args) => $scope.$apply(() => target.call(target, ...args));
      }
      if (Array.isArray(target)) {
        return target
      }
      if (typeof target === 'object') {
        return new Proxy(target, handler)
      }
      return target;
    }
  }

  return new Proxy(api, digestExecutionContext)
}
