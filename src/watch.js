import React from 'react';
import $inject from './inject';

const withDependencies = $inject('$rootScope');

/**
 * Watches properties for mutable changes from angular.
 *
 * @param {string} watchProps A variadic list of properties to watch.
 * @return {Function} The higher order component of watched props.
 */
export default function watch (...watchProps) {
  return WrappedComponent => {
    class ComponentWithWatchedProps extends React.Component {
      // State will contain changes in the watched props
      state = {}

      componentDidMount() {
        this.$watchScope = this.props.$rootScope.$new();

        // Since angular may mutate changes, watch the specified values
        // and update the state with the changes.
        watchProps.forEach(prop => {
          this.$watchScope.$watch(
            () => this.props[prop],
            nextValue => {
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
            // Forward the props along with any changes to the underlying component
            {...this.props}
            {...this.state}
          />
        )
      }
    }

    return withDependencies(ComponentWithWatchedProps);
  }
}
