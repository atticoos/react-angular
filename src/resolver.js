import React from 'react';
import Promise from 'bluebird';
import {withInjector} from './provider';
import watch from './watch';

/**
 * Angular resolves for a React component.
 *
 * Example:
 * ```
 * resolve({
 *   todos: ['TodoService', TodoService => TodoService.getTodos()]
 * })(ReactApp)
 * const ReactApp = ({todos}) => (
 *   <ul>
 *     {todos.map(todo => (
 *       <li key={todo.id}>{todo.title}</li>
 *     ))}
 *   </ul>
 * )
 * ```
 * @param {Object} resolves A map of resolvers.
 * @return {Function} A higher order component that resolves data from Angular.
 */
export default function resolve (resolves) {
  // A list of resolves that should be watched for mutations.
  // Specified by resolve.watch.
  // Eg:
  // resolve({
  //   foo: resolve.watch(['FooService', FooService => FooService.getFoo()])
  // })
  const watchers = Object.keys(resolves).filter(name => requiresWatcher(resolves[name]))

  return WrappedComponent => {
    // If resolves need to be watched, decorate the component with those watchers in place.
    if (watchers.length > 0) {
      let withWatchers = watch(watchers)
      WrappedComponent = withWatchers(WrappedComponent)
    }

    class ComponentWithResolves extends React.Component {
      state = {
        $resolves: {},
        $resolved: false,

        // @TODO: we may want to allow the component to show a fallback UI
        // in the event that resolvers fail.
        $failed: false
      }

      componentDidMount() {
        const {$injector} = this.props;

        // Execute the resolvers.
        let pendingResolves = Object.keys(resolves).reduce((resolved, prop) => {
          // Gets the full resolver statement, eg ['FooService', FooService => ...]
          let resolveStatement = resolverFrom(resolves[prop]);

          // Gets the resolver function, eg FooService => ...
          let resolver = resolveStatement[resolveStatement.length - 1];

          // Gets the dependencies, eg 'FooService'
          let unresolvedDeps = resolveStatement.slice(0, resolveStatement.length - 1);

          // Resolve the dependencies
          let resolvedDeps = unresolvedDeps.map(dep => $injector.get(dep));

          // Execute and store the result of the resolver
          resolved[prop] = resolver(...resolvedDeps)
          return resolved;
        }, {});

        // If any resolvers return pending promises, await completion.
        Promise.props(pendingResolves)
          .then($resolves => this.setState({
            $resolves,
            $resolved: true
          }))
          .catch((error) => {
            console.warn('[angular-react] failed to resolve', error);
          })
      }

      render() {
        // Render nothing until the resolvers have resolved their data.
        if (!this.state.$resolved) {
          return null;
        }

        return (
          <WrappedComponent
            {...this.props}
            // Provide the resolved values to the component
            {...this.state.$resolves}
          />
        )
      }
    }

    return withInjector(ComponentWithResolves);
  }
}

resolve.watch = function watch (resolver) {
  return {
    watch: true,
    resolver
  };
};

function resolverFrom (resolver) {
  return resolver.resolver || resolver;
}

function requiresWatcher (resolver) {
  return !!resolver.watch
}
