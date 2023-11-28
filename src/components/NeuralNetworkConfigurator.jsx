import React, { useState } from "react";
import {
	Button,
	Card,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
} from "reactstrap";
import NetworkVisualization from "./NetworkVisualization";

const NeuralNetworkConfigurator = () => {
	const [numHiddenLayers, setNumHiddenLayers] = useState(2);
	const [nodesPerLayer, setNodesPerLayer] = useState(3);
	const [isVisualizing, setIsVisualizing] = useState(false);

	const handleVisualizeNetwork = (event) => {
		event.preventDefault();
		setIsVisualizing(true);
	};

	return (
		<div>
			<Form onSubmit={handleVisualizeNetwork}>
				<Row>
					<Col md={6}>
						<FormGroup>
							<Label for="dataFunction">Hidden Layers</Label>
							<Input
								type="number"
								name="hiddenLayers"
								id="hiddenLayers"
								value={numHiddenLayers}
								onChange={(e) =>
									setIsVisualizing(false) &
									setNumHiddenLayers(e.target.value)
								}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label for="numPoints">Nodes Per Layer</Label>
							<Input
								type="number"
								name="nodesPerLayer"
								id="nodesPerLayer"
								value={nodesPerLayer}
								onChange={(e) =>
									setIsVisualizing(false) &
									setNodesPerLayer(e.target.value)
								}
							/>
						</FormGroup>
					</Col>
				</Row>
				<Button type="submit" color="info">
					Visualize Neural Network
				</Button>
			</Form>

			{isVisualizing && (
				<Card>
					<NetworkVisualization
						numHiddenLayers={numHiddenLayers}
						nodesPerLayer={nodesPerLayer}
					/>
				</Card>
			)}
			<Form>
				<Row>
					<Col md={6}>
						{/* Training data */}
						<FormGroup>
							<Label for="trainingData">Training Data</Label>
							<Input
								type="number"
								name="trainingData"
								id="trainingData"
								placeholder="e.g., 1000"
							></Input>
						</FormGroup>
					</Col>
					<Col md={6}>
						{/* Testing data */}
						<FormGroup>
							<Label for="testingData">Testing Data</Label>
							<Input
								type="number"
								name="testingData"
								id="testingData"
								placeholder="e.g., 1000"
							></Input>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label for="learningRate">Learning Rate</Label>
							<Input
								type="number"
								name="learningRate"
								id="learningRate"
								placeholder="e.g., 0.01"
								step="0.01"
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label for="epochs">Number of Epochs</Label>
							<Input
								type="number"
								name="epochs"
								id="epochs"
								placeholder="e.g., 100"
							/>
						</FormGroup>
					</Col>

					<Col md={6}>
						<FormGroup>
							<Label for="batchSize">Batch Size</Label>
							<Input
								type="number"
								name="batchSize"
								id="batchSize"
								placeholder="e.g., 32"
							/>
						</FormGroup>
					</Col>

					<Col md={6}>
						<FormGroup>
							<Label for="activationFunction">
								Activation Function
							</Label>
							<Input
								type="select"
								name="activationFunction"
								id="activationFunction"
							>
								<option>ReLU</option>
								<option>Sigmoid</option>
								<option>Tanh</option>
							</Input>
						</FormGroup>
					</Col>

					<Col md={6}>
						<FormGroup>
							{/* Training duration */}

							<Label for="trainingDuration">
								Training Duration
							</Label>
							<Input
								type="time"
								name="trainingDuration"
								id="trainingDuration"
								value="00:00:00"
								onChange={(e) => {
									console.log(e.target.value);
								}}
							/>
						</FormGroup>
					</Col>
				</Row>

				<Button type="submit" color="info">
					Visualize Neural Network
				</Button>
			</Form>
			{isVisualizing && (
				<Card>
					<NetworkVisualization
						numHiddenLayers={5}
						nodesPerLayer={6}
					/>
				</Card>
			)}
		</div>
	);
};

export default NeuralNetworkConfigurator;
