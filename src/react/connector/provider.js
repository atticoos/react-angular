import React from 'react'
import PropTypes from 'prop-types'
import angular from 'angular'

const {Provider, Consumer} = React.createProvider({$injector: null})

function AngularProvider ({$injector, ...props}) {
  return (
    <Provider {...props} $injector={$injector} />
  );
}

export function withInjector (WrappedComponent) {
  return props => (
    <Consumer>
      {$injector => <WrappedComponent {...props} $injector={$injector} />}
    </Consumer>
  );
}