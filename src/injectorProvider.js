import React from 'react';

/**
 * Provides angular's $injector instance for managing angular dependencies.
 */
const {Provider, Consumer} = React.createContext(null);

/**
 * Consumes the $injector.
 */
export const InjectorConsumer = Consumer;

/**
 * Provider of the $injector.
 *
 * @param {Object} props The component props
 * @param {Object} props.$injector The angular $injector instance.
 * @param {Object} props.children React children.
 */
export const InjectorProvider = ({$injector, children}) => (
  <Provider value={$injector}>
    {children}
  </Provider>
);

/**
 * Provides a component with the $injector as a prop.
 *
 * @param {Component} WrappedComponent The component to receive the $injector.
 * @return {Component} The component with the $injector.
 */
export function withInjector (WrappedComponent) {
  return props => (
    <Consumer>
      {$injector => <WrappedComponent {...props} $injector={$injector} />}
    </Consumer>
  );
}
