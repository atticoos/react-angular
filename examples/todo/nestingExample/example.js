import React from 'react'
import ReactNested from './react'

export default class NestingExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1,
      maxDepth: 4
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({count: this.state.count + 1})
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return (
      <div style={style}>
        <h2>React + Angular Nesting</h2>

        Max Depth:
        <select
          value={this.state.maxDepth}
          onChange={e => this.setState({maxDepth: parseInt(e.target.value)})}
        >
          {new Array(11).fill().map((v, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        <ReactNested
          level={0}
          max={this.state.maxDepth}
          count={this.state.count}
          callback={input => alert(input)}
        />
      </div>
    )
  }
}

const style = {
  backgroundColor: 'gray',
  border: '2px dashed lightgray',
  padding: 20,
  margin: 20
};
