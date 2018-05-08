# react-angular

Access your Angular application from within React.

### Installation

```
npm install angular-react react prop-types react-dom
```

### Simple component example

A typical React component receiving props

```js
import 'ngReact'
import angular from 'angular'
import {registerReactComponent} from 'react-angular'

const app = angular.module('your-project.react', ['react'])

function ExampleReactComponent (props) {
  return (
    <div>
      The value is: {props.value}
    </div>
  )
}

registerReactComponent(app, 'exampleReactComponent', ExampleReactComponent)
```
```html
<example-react-component value="'Hello World'"></example-react-component>
```

### Complex component example

A React component that depends on Angular services.

Assume a `Counter` service exists and the React component requires it

```js
import {
  registerReactComponent,
  compose,
  $inject,
  $resolve
} from 'react-angular';

const app = angular.module('your-project.react', ['react'])

// Define the component dependencies (resolves, services, etc)
const connect = compose(
  // Inject angular services,
  $inject('Counter'),

  // Define data resolvers
  $resolve({
    // Resolve the current count and observe changes.
    count: $resolve.watch(['Counter', Counter => Counter.getCount()]),
    // Resolve the count upon component mount without watching changes
    originalCount: ['Counter', Counter => Counter.getCount()]
  })
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
```
```html
<react-counter></react-counter>
```
