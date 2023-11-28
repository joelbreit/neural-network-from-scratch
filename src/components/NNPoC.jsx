import React, { useEffect, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";

const NNPoC = () => {
	const networkRef = useRef(null);

	useEffect(() => {
		// Nodes and edges data
		const nodes = new DataSet();
		const edges = new DataSet();

		// Example configuration
		const inputLayerSize = 3;
		const hiddenLayer1Size = 4;
		const hiddenLayer2Size = 4;
		const outputLayerSize = 2;

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

		// Add nodes for each layer
		addNodes(1, inputLayerSize, "Input");
		addNodes(2, hiddenLayer1Size, "Hidden 1");
		addNodes(3, hiddenLayer2Size, "Hidden 2");
		addNodes(4, outputLayerSize, "Output");

		// Connect layers
		connectLayers(1, 2, inputLayerSize, hiddenLayer1Size);
		connectLayers(2, 3, hiddenLayer1Size, hiddenLayer2Size);
		connectLayers(3, 4, hiddenLayer2Size, outputLayerSize);

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
	}, []);

	return <div ref={networkRef} style={{ height: "500px", width: "100%" }} />;
};

export default NNPoC;
