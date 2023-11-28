import React, { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";

const NeuralNetworkVisualization = ({ numHiddenLayers, nodesPerLayer }) => {
	const networkRef = useRef(null);

	useEffect(() => {
		const nodes = new DataSet();
		const edges = new DataSet();

		// Hard-coded input and output layer sizes
		const numInputs = 2;
		const numOutputs = 1;

		// Function to add nodes
		const addNodes = (layer, size, labelPrefix) => {
			for (let i = 0; i < size; i++) {
				nodes.add({
					id: `${layer}-${i}`,
					label: `${labelPrefix} ${i + 1}`,
					level: layer,
				});
			}
		};

		// Function to connect layers
		const connectLayers = (layerFrom, layerTo, sizeFrom, sizeTo) => {
			for (let i = 0; i < sizeFrom; i++) {
				for (let j = 0; j < sizeTo; j++) {
					edges.add({
						from: `${layerFrom}-${i}`,
						to: `${layerTo}-${j}`,
					});
				}
			}
		};

		// Add input nodes
		addNodes(0, numInputs, "Input");

		// Add hidden layers
		for (let i = 0; i < numHiddenLayers; i++) {
			addNodes(i + 1, nodesPerLayer, `Hidden ${i + 1}`);
		}

		// Add output nodes
		addNodes(numHiddenLayers + 1, numOutputs, "Output");

		// Connect layers
		if (numHiddenLayers > 0) {
			// Connect input to first hidden layer
			connectLayers(0, 1, numInputs, nodesPerLayer);

			// Connect hidden layers
			for (let i = 0; i < numHiddenLayers - 1; i++) {
				connectLayers(i + 1, i + 2, nodesPerLayer, nodesPerLayer);
			}

			// Connect last hidden layer to output
			connectLayers(
				numHiddenLayers,
				numHiddenLayers + 1,
				nodesPerLayer,
				numOutputs
			);
		} else {
			// Connect input directly to output
			connectLayers(0, 1, numInputs, numOutputs);
		}

		// Network options
		const options = {
			layout: {
				hierarchical: {
					direction: "LR",
					sortMethod: "directed",
				},
			},
			nodes: {
				shape: "circle",
			},
			physics: {
				hierarchicalRepulsion: {
					centralGravity: 0,
				},
				solver: "hierarchicalRepulsion",
			},
		};

		// Create the network
		new Network(networkRef.current, { nodes, edges }, options);
	}, [numHiddenLayers, nodesPerLayer]);

	return <div ref={networkRef} style={{ height: "500px", width: "100%" }} />;
};

export default NeuralNetworkVisualization;
