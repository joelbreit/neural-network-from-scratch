import Neuron from './Neuron.jsx';

class Network {
	constructor() {
		this.nodes = [];
		this.edges = [];
	}

	addNode(node) {
		this.nodes.push(node);
	}

	addEdge(edge) {
		this.edges.push(edge);
	}
}
