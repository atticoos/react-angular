import React from 'react';
import omit from 'lodash.omit';
import AngularProvider from './provider';

/**
 * Provides a route-level component with what it needs to support angular's dependency injection.
 *
 * @param {Function} WrappedComponent The component to make angular's DI available to.
 * @returns {Function} The higher order component that can be attached to the router.
 */
export default function forRouter (WrappedComponent, selectProps = defaultSelectProps) {
  class RouterComponent extends React.Component {
    constructor(props) {
      super(props);
      this.$injector = this.props.transition.injector();
      this.$scope = this.$injector.get('$rootScope').$new(true);
    }

    render() {
      return (
        // Wrap the component within the AngularProvider to make the $injector and $scope
        // available to descendants.
        <AngularProvider $injector={this.$injector} $scope={this.$scope}>
          <WrappedComponent {...selectProps(this.props)} />
        </AngularProvider>
      )
    }
  }
  return RouterComponent;
}

/**
 * Pluck fields out of the provided props and produce a set of forwardable props
 * to the child component.
 *
 * @param {Object} props The provided props.
 * @returns {Object} The forwardable props.
 */
function defaultSelectProps (props) {
  return omit(props, [
    '$injector',
    '$state$',
    '$stateParams',
    '$transition$',
    '$translate',
    'className',
    'transition'
  ]);
}
