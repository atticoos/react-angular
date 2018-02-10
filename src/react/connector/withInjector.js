import React from 'react';
import PropTypes from 'prop-types';

export default function withInjector (WrappedComponent) {
  class ComponentWithInjector extends React.Component {
    static contextTypes = {
      $ng: PropTypes.object
    };

    constructor(props, context) {
      super(props, context);

      this.$injector = context.$ng.injector();
    }

    render() {
      return <WrappedComponent {...this.props} $injector={this.$injector} />
    }
  }
  return ComponentWithInjector;
}
