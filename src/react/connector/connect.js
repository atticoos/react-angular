import React from 'react';
import PropTypes from 'prop-types';
import withInjector from './withInjector';

/**
 * Connect a React component to the Angular runtime.
 *
 * const ConnectedComponent = connectAngular(
 *   'depA',
 *   'depB',
 * )(UnconnectedComponent)
 *
 * // renders:
 * // <UnconnectedComponent depA={depInstanceA} depB={depInstanceB} />
 * @param {*} deps
 */
export default function connectAngular (...deps) {
  return WrappedComponent => {
    class ConnectedAngularComponent extends React.Component {
      static contextTypes = {
        $ng: PropTypes.object
      }
      $injections = {};

      constructor (props, context) {
        super(props, context);

        this.$injections = deps.reduce((injections, dep) => {
          injections[dep] = props.$injector.get(dep)
          return injections;
        }, {});
      }

      render() {
        return (
          <WrappedComponent {...this.props} {...this.$injections} />
        )
      }
    }

    return withInjector(ConnectedAngularComponent);
  };
}