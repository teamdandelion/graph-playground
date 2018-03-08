import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GraphRenderer />
      </div>
    );
  }
}


class GraphRenderer extends Component {
  render() {
    return (
      <svg>
        <PrettyCircle cx="50" cy="50" r="30" />
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
