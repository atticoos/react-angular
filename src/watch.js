import React from 'react';
import $inject from './inject';
import {withScope} from './scopeProvider';

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
        // Re-use the scope that this component is already in to watch the values.
        const {$scope} = this.props;

        // Since angular may mutate changes, watch the specified values
        // and update the state with the changes.
        this.$watchers = watchProps.map(prop => {
          return $scope.$watch(
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
        if (Array.isArray(this.$watchers)) {
          // Destroy all watchers that this scope has assigned.
          // This is important to prevent memory leaks.
          this.$watchers.forEach(watcher => watcher())
        }
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

    return withScope(ComponentWithWatchedProps);
  }
}
