import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'

// Root node in React tree that acquires Angular instance
// and provides it to the rest of the React app
export default class AngularProvider extends React.Component {
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
