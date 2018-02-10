import React from 'react';
import {
  AngularProvider,
  connectAngular as connect,
  resolve,
  compose,
  watch
} from './connector';

function ReactComponent ({Counter, count, collection}) {
  return (
    <div>
      <h2>This is a React component</h2>
      count from service: {Counter.getCount()}<br/>
      count from resolver: {count}<br/>
      collection: {JSON.stringify(collection)}
    </div>
  )
}

const ConnectedReactComponent = compose(
  // Angular resolver
  resolve({
    count: ['Counter', Counter => Counter.getCount()],
    collection: ['MutableCollection', MutableCollection => MutableCollection.getCollection()]
  }),

  // Watch mutations
  watch('count', 'collection'),

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
