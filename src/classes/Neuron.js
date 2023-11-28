import Parameter from './Parameter.jsx';

class Neuron {
	constructor() {
		this.value = 0;
		this.connections = [];
	}
	connect(neuron) {
		this.connections.push(neuron);
	}
	fire() {
		this.value = 1;
		this.connections.forEach((neuron) => {
			neuron.value += this.value;
		});
	}
}

export default Neuron;