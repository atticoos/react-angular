import React from 'react';
import {withInjector} from './provider';

export default function apply(appliables) {
  return WrappedComponent => {
    class ComponentWithApply extends React.Component {
      state = {
        appliables: null
      }

      constructor(props) {
        super(props);

        const $rootScope = props.$injector.get('$rootScope');

        this.$componentScope = $rootScope.$new();

        this.$apply = this.$apply.bind(this);
      }

      componentWillMount() {
        var wrappedAppliables = Object.keys(appliables).reduce((wrapped, appliable) => {
          var deps = appliables[appliable]
            .slice(0, appliables[appliable].length - 1)
            .map(dep => this.props.$injector.get(dep))

          let resolver = appliables[appliable][appliables[appliable].length - 1]

          var fn = resolver(...deps)
          wrapped[appliable] = (...args) => this.$apply(fn(...args));
          return wrapped;
        }, {});
        this.setState({appliables: wrappedAppliables})
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
            {...this.state.appliables}
            $apply={this.$apply}
          />
        );
      }
    }

    return withInjector(ComponentWithApply);
  }
}
