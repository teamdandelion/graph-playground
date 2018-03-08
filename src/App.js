import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const nodes = [];
function addNode(x, y, r) {
  const nid = nodes.length;
  const n = {x, y, r: r || 10, nid}
  nodes.push(n);
  return n;
}

const edges = [];
function addEdge(n1, n2) {
  const eid = edges.length;
  const e = {n1, n2, eid};
  edges.push(e);
  return e;
}

const n1 = addNode(20, 20);
const n2 = addNode(45, 75);
const n3 = addNode(100, 15);
const n4 = addNode(110, 125);

const e1 = addEdge(n1, n2);
const e2 = addEdge(n1, n3);
const e3 = addEdge(n1, n4);
const e4 = addEdge(n2, n4);

class App extends Component {
  render() {
    return (
      <div className="App">
        <GraphRenderer nodes={nodes} edges={edges}/>
      </div>
    );
  }
}


class GraphRenderer extends Component {
  render() {
    const circles = this.props.nodes.map(x => <Node node={x}/>)
    const edges = this.props.edges.map(x => <Edge edge={x}/>)
    return (
      <svg>
        {edges}
        {circles}
      </svg>
    )
  }
}

class Node extends Component {
  render() {
    const cx = this.props.node.x;
    const cy = this.props.node.y;
    const r = this.props.node.r;
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} />
        <circle cx={cx} cy={cy} r={r-2} fill="white" />
      </g>
    )
  }
}

class Edge extends Component {
  render() {
    const x1 = this.props.edge.n1.x;
    const x2 = this.props.edge.n2.x;
    const y1 = this.props.edge.n1.y;
    const y2 = this.props.edge.n2.y;
    return (
      <line stroke="black" x1={x1} x2={x2} y1={y1} y2={y2} />
    )
  }
}

export default App;
