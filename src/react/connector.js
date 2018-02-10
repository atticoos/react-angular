import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'

// Root node in React tree that acquires Angular instance
// and provides it to the rest of the React app
export class AngularProvider extends React.Component {
  static propTypes = {
    ngApp: PropTypes.object
  }

  static childContextTypes = {
    $ng: PropTypes.object
  }

  componentDidMount() {
    // this.ng = angular.element(document.querySelector(`[ng-app="${this.props.ngApp}"]`));
  }

  getChildContext() {
    return {
      $ng: this.props.ngApp
    };
  }

  render() {
    return this.props.children;
  }
}

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
export function connectAngular (...deps) {
  return WrappedComponent => {
    class ConnectedAngularComponent extends React.Component {
      static contextTypes = {
        $ng: PropTypes.object
      }
      $injections = {};

      constructor (props, context) {
        super(props, context);

        let $injector = context.$ng.injector();

        this.$injections = deps.reduce((injections, dep) => {
          injections[dep] = $injector.get(dep)
          return injections;
        }, {});
      }

      render() {
        return (
          <WrappedComponent {...this.$injections} />
        )
      }
    }
    return ConnectedAngularComponent;
  };
}
