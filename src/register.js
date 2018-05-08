import React from 'react';
import angular from 'angular';
import AngularProvider from './provider';


export default function registerReactComponent (angularModule, componentName, Component) {
  angularModule.directive(componentName, function ($injector, reactDirective) {
    return reactDirective((props) => (
      <AngularProvider $injector={$injector}>
        <Component {...props} />
      </AngularProvider>
    ));
  });
}
