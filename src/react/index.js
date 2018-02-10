import React from 'react';
import {
  AngularProvider,
  connectAngular as connect,
  resolve,
  compose
} from './connector';

function ReactComponent ({Counter, count}) {
  return (
    <div>
      <h2>This is a React component</h2>
      count from service: {Counter.getCount()}<br/>
      count from resolver: {count}
    </div>
  )
}

const ConnectedReactComponent = compose(
  // Angular resolver
  resolve({
    count: ['Counter', Counter => Counter.getCount()],
  }),
  // Angular service injector
  connect('Counter')
)(ReactComponent)

export default function ReactApp () {
  return (
    <AngularProvider ngApp={angular.element(document.querySelector('body'))}>
      <ConnectedReactComponent />
    </AngularProvider>
  )
}
