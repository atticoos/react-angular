import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'

const {Provider, Consumer} = React.createContext(null)

export default function AngularProvider ({$injector, children}) {
  return (
    <Provider value={$injector}>
      {children}
    </Provider>
  );
}

export function withInjector (WrappedComponent) {
  return props => (
    <Consumer>
      {$injector => <WrappedComponent {...props} $injector={$injector} />}
    </Consumer>
  );
}
