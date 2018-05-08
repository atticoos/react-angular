export default function compose (...fns) {
  // If there are no provided functions, return a noop.
  if (fns.length === 0) {
    return input => input;
  }

  // If only one function is provided, return that.
  if (fns.length === 1) {
    return fns[0];
  }

  // Otherwise reduce the collection of funtions into a callstack from right-to-left.
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}
