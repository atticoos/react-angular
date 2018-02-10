import React from 'react';
import {AngularProvider, connectAngular} from './connector';

function ReactComponent ({Counter}) {
  return (
    <span>A react component, with the count: {Counter.getCount()}</span>
  )
}

const ConnectedReactComponent = connectAngular(
  'Counter'
)(ReactComponent);

export default function ReactApp () {
  return (
    <AngularProvider ngApp={angular.element(document.querySelector('body'))}>
      <ConnectedReactComponent />
    </AngularProvider>
  )
}
