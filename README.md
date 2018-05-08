# react-angular

Access your Angular application from within React.

```js
import {
  registerReactComponent,
  compose,
  $inject,
  $resolve
} from 'react-angular';

const app = angular.module('your-project.react', ['ngReact'])

// Define the component dependencies (resolves, services, etc)
const connect = compose(
  // Define data resolvers
  $resolve({
    count: $resolve.watch(['Counter', Counter => Counter.getCount()]),
    originalCount: ['Counter', Counter => Counter.getCount()]
  }),

  // Inject angular services,
  $inject('Counter')
)

// Your React component
function ReactConter ({Counter, count, originalCount}) {
  return (
    <div>
      <p>Count direction from CounterService: {Counter.getCount()}</p>
      <p>Count from resolve: {count}</p>
      <p>Original count (without watchers) from resolve: {originalCount}</p>
      <button onClick={() => Counter.increment()}>+</button>
      <button onClick={() => Counter.decrement()}>-</button>
    </div>
  )
}

// Register the component to be available in Angular
registerReactComponent(app, 'reactCounter', connect(ReactCounter))
