import React from 'react';
import withInjector from './withInjector';

export default function watch (...watchProps) {
  return WrappedComponent => {
    class ComponentWithWatchedProps extends React.Component {
      state = {}

      componentDidMount() {
        const $rootScope = this.props.$injector.get('$rootScope');
        this.$watchScope = $rootScope.$new();

        watchProps.forEach(prop => {
          let skipFirst = true;
          this.$watchScope.$watch(
            () => this.props[prop],
            nextValue => {
              if (skipFirst) {
                skipFirst = false;
                return;
              }
              this.setState(prevState => ({
                [prop]: nextValue
              }))
            },
            true
          )
        })
      }

      componentWillUnmount() {
        this.$watchScope.$destroy();
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...this.state}
          />
        )
      }
    }

    return withInjector(ComponentWithWatchedProps);
  }
}
