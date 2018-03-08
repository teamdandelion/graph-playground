import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  nodes() {
    return [
      {cx: 10, cy:10, r:5},
      {cx: 32, cy: 8, r: 9},
      {cx: 50, cy: 32, r:17}
    ];
  }

  render() {
    return (
      <div className="App">
        <GraphRenderer nodes={this.nodes()}/>
      </div>
    );
  }
}


class GraphRenderer extends Component {
  render() {
    const circles = this.props.nodes.map(x => <PrettyCircle cx={x.cx} cy={x.cy} r={x.r} />)
    return (
      <svg>
        {circles}
      </svg>
    )
  }
}

class PrettyCircle extends Component {
  render() {
    return (
      <g>
        <circle cx={this.props.cx} cy={this.props.cy} r={this.props.r} />
        <circle cx={this.props.cx} cy={this.props.cy} r={this.props.r-2} fill="white" />
      </g>
    )
  }
}

export default App;
