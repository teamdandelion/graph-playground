import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as force from 'd3-force';

const SVG_WIDTH = 960;
const SVG_HEIGHT = 960;
const N_NODES = 100;
const N_EDGES = 145;
const R=5;


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
    const nodes = [];
    function addNode(x, y, r) {
      const nid = nodes.length;
      const n = {x, y, r: r || R, nid}
      nodes.push(n);
      return n;
    }

    const edges = [];
    function addEdge(source, target) {
      const eid = edges.length;
      const e = {source, target, eid};
      edges.push(e);
      return e;
    }

    for (let i=0; i<N_NODES; i++) {
      addNode();
    }

    for (let i=0; i<N_EDGES; i++) {
      const i0 = Math.floor(Math.random() * nodes.length);
      const i1 = Math.floor(Math.random() * nodes.length);
      addEdge(nodes[i0], nodes[i1]);
    }

    this.state = {nodes, edges};

    this.simulation = force.forceSimulation(nodes)
      .force("charge", force.forceManyBody().strength(-80))
      .force("x", force.forceX(SVG_WIDTH/2))
      .force("y", force.forceY(SVG_HEIGHT/2))
      .force("link", force.forceLink(edges))
  }

  componentDidMount() {
    this.simulation.on("tick", () => this.tick());
  }

  tick() {
    this.forceUpdate();
  }

  render() {
    const circles = this.state.nodes.map(x => <Node key={x.nid} node={x}/>)
    const edges = this.state.edges.map(x => <Edge key={x.eid} edge={x}/>)
    return (
      <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
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
    const x1 = this.props.edge.source.x;
    const x2 = this.props.edge.target.x;
    const y1 = this.props.edge.source.y;
    const y2 = this.props.edge.target.y;
    return (
      <line stroke="black" x1={x1} x2={x2} y1={y1} y2={y2} />
    )
  }
}

export default App;
