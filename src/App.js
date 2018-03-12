import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as force from 'd3-force';

const SVG_WIDTH = 960;
const SVG_HEIGHT = 960;
const N_NODES = 35;
const N_EDGES = 30;
const R = 9;

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
  constructor(props) {
    super(props);
    this.nodes = [];

    this.edges = [];

    for (let i=0; i<N_NODES; i++) {
      this.addNode();
    }

    for (let i=0; i<N_EDGES; i++) {
      this.addEdge();
    }

    this.state = {nodes: this.nodes, edges: this.edges};

    this.simulation = force.forceSimulation(this.nodes)
      .force("charge", force.forceManyBody().strength(-80))
      .force("x", force.forceX())
      .force("y", force.forceY())
      .force("link", force.forceLink(this.edges))
  }

  addNode(x, y, r) {
    const nid = this.nodes.length;
    const n = {x, y, r: r || R, nid}
    this.nodes.push(n);
    return n;
  }

  addEdge(source, target) {
    const i0 = Math.floor(Math.random() * this.nodes.length);
    const i1 = Math.floor(Math.random() * this.nodes.length);
    source = source || this.nodes[i0];
    target = target || this.nodes[i1];
    const eid = this.edges.length;
    const e = {source, target, eid};
    this.edges.push(e);
    return e;
  }

  componentDidMount() {
    this.simulation.on("tick", () => this.tick());
    window.renderer = this;
  }

  tick() {
    this.forceUpdate();
  }

  render() {
    const nodes = this.state.nodes.map(x => <Node key={x.nid} node={x}/>)
    const edges = this.state.edges.map(x => <Edge key={x.eid} edge={x}/>)
    return (
      <div>
        <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
          <text y="35">n={nodes.length} e={edges.length}</text>
          <g>{edges}</g>
          <g>{nodes}</g>
        </svg>
      </div>
    )
  }
}

class Node extends Component {
  render() {
    const cx = this.props.node.x + SVG_WIDTH/2;
    const cy = this.props.node.y + SVG_HEIGHT/2;
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
    const x1 = this.props.edge.source.x + SVG_WIDTH/2;
    const x2 = this.props.edge.target.x + SVG_WIDTH/2;
    const y1 = this.props.edge.source.y + SVG_HEIGHT/2;
    const y2 = this.props.edge.target.y + SVG_HEIGHT/2;
    return (
      <line stroke="black" x1={x1} x2={x2} y1={y1} y2={y2} />
    )
  }
}

export default App;
