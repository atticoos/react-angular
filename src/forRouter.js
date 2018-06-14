import React from 'react';
import AngularProvider from './provider';

export default function forRouter (WrappedComponent) {
  class RouterComponent extends React.Component {
    constructor(props) {
      super(props);
      this.$injector = this.props.transition.injector();
    }

    render() {
      return (
        <AngularProvider $injector={this.$injector}>
          <WrappedComponent {...extractForwardProps(this.props)} />
        </AngularProvider>
      )
    }
  }
  return RouterComponent;
}

function extractForwardProps (props) {
  var {$injector, $state$, $stateParams, $transition$, $translate, className, transition, ...forwardProps} = props;
  return forwardProps;
}
