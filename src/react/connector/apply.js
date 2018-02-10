import React from 'react';
import withInjector from './withInjector';

export default function apply() {
  return WrappedComponent => {
    class ComponentWithApply extends React.Component {
      constructor(props) {
        super(props);

        const $rootScope = props.$injector.get('$rootScope');

        this.$componentScope = $rootScope.$new();

        this.$apply = this.$apply.bind(this);
      }

      componentWillUnmount() {
        this.$componentScope.destroy();
      }

      $apply(cb) {
        this.$componentScope.$apply(cb);
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            $apply={this.$apply}
          />
        );
      }
    }

    return withInjector(ComponentWithApply);
  }
}
