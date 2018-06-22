const Phase = {
  DIGEST: '$digest',
  APPLY: '$apply'
}

/**
 * Ensurest that given function will always run during the `$apply` phase in angular.
 */
export function runInApply ($scope, fn) {
  switch ($scope.$root.$$phase) {
    case Phase.DIGEST:
      // If angular is current `$digest`ing, we want to schedule our function to run right after it ends.
      // At that time the `$digest` `$$phase` will have concluded, meaning that we can invoke a new cycle.
      // For ease of managing the lifecycle, this is just a recursive function.
      // This will also run much sooner than `$applyAsync` ever will, reducing the latency.
      $scope.$$postDigest(() => runInApply($scope, fn));
      break;
    case Phase.APPLY:
      // `$apply` is already happening, meaning a global (`$rootScope`) `$digest` will occur,
      // and that ensures that the changes that this function will make will propagate globally.
      fn();
      break;
    default:
      // Nothing's running, angular is resting. Invoke `$apply`, evaluate the function in `$apply` phase.
      // Notice - we are just recursively calling this function again, as it will detect that we are in `$apply` phase
      // and will automatically call the `fn`.
      $scope.$apply(() => runInApply($scope, fn));
  }
}

/**
 * Ensures that $rootScope's digest is always run.
 */
export function ensureRootDigest ($scope) {
  switch ($scope.$root.$$phase) {
    case Phase.DIGEST:
      // If we are already in `$digest`, we can't for sure know _where_ it's happening.
      // Schedule another digest to run after the current one, ensuring it will proccess all child scopes of root scope.
      // Recursively calls itself - optimization in case there will be `$apply` already in progress, which will
      // invoke the root scope digest, so that we don't have to.
      $scope.$$postDigest(() => ensureRootDigest($scope));
      break;
    case Phase.APPLY:
      // No-op - `$apply` will ensure that `$rootScope.$digest` will run.
      break;
    default:
      // Run the `$digest` on the root scope. Processes all watchers on all scopes in current application.
      $scope.$root.$digest();
  }
}
