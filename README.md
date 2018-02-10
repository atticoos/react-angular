# react-angular

Access your Angular application from within React.

```js
import {
  AngularProvider,
  compose,
  inject,
  resolve,
  watch
} from 'react-angular';

// Root react app
function ReactApp () {
  return (
    <AngularProvider ngApp={angular.element(document.querySelector('body'))}>
      <ConnectedReactComponent />
    </AngularProvider>
  )
}

// Your normal React component
function ReactComponent ({Counter, count, collection}) {
  return (
    <div>
      <h2>React Component</h2>
      <p>Count from CounterService: {Counter.getCount()}</p>
      <p>Count from resolve: {count}</p>
      <p>Collection from resolve: {collection}</p>
    </div>
  )
}

// Bind your React component to your Angular instance
const ConnectedReactComponent = compose(
  // Define data resolvers
  resolve({
    count: ['Counter', Counter => Counter.getCount()],
    collection: ['MutableCollection', MutableCollection => MutableCollection.getCollection()]
  }),

  // Watch resolver mutations
  watch('count', 'collection'),

  // Inject angular services,
  inject('Counter')
)(ReactComponent)
```
