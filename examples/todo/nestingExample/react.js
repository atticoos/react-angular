import React from 'react';
import {$inject} from 'angular-react';

const AngularNested = reactify('angular-nested');

export default function ReactNested ({level, max, count, callback}) {
  return (
    <div style={reactStyle}>
      <h4>[React] level {level}</h4>
      <div>state: {count}</div>
      <button onClick={() => callback(`[React] level: ${level}`)}>
        callback
      </button>

      {level < max && (
        <AngularNested
          level={level + 1}
          max={max}
          callback={callback}
          count={count}
        />
      )}
    </div>
  )
}

const reactStyle = {
  backgroundColor: 'gray',
  border: '2px dashed lightgray',
  padding: 20,
  margin: 20
};


function reactify(componentName) {
  class ReactifiedComponent extends React.Component {
    getForwardProps() {
      const {$rootScope, $compile, $injector, ...props} = this.props;
      return props
    }
    componentDidMount() {
      const {$rootScope, $compile} = this.props;
      this.$scope = $rootScope.$new();
      var $scope = this.$scope;
      let props = this.getForwardProps();
      let attrs = Object.keys(props).reduce((acc, key) => {
        acc.push(`${key}="${key}"`)
        return acc
      }, []).join(' ')

      let childString = `<${componentName} ${attrs}></${componentName}>`


      Object.assign($scope, props)
      console.log('das scope', {$scope, props, childString})
      let child = angular.element(childString)
      this.$element.append(child)
      $compile(child)($scope)
    }

    componentDidUpdate() {
      this.$scope.$applyAsync(() => {
        Object.assign(this.$scope, this.getForwardProps())
      })
    }

    render() {
      return React.createElement('div', {
        ref: ref => this.$element = angular.element(ref)
      })
    }
  }
  return $inject('$rootScope', '$compile')(ReactifiedComponent)
}
