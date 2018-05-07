import React from 'react';
import PropTypes from 'prop-types';

export default function withInjector (WrappedComponent) {
  class ComponentWithInjector extends React.Component {
    static contextTypes = {
      $injector: PropTypes.object
    };

    render() {
      return <WrappedComponent {...this.props} $injector={this.context.$injector} />
    }
  }
  return ComponentWithInjector;
}
