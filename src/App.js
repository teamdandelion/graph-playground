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
        <circle cx="50" cy="50" r="30" />
      </svg>
    )
  }
}

export default App;
