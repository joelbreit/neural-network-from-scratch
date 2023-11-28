import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
} from "reactstrap";

import React from "react";

const HomeContent = () => {
	const [dataFunction, setDataFunction] = React.useState("Linear");
	const [trainingData, setTrainingData] = React.useState("Linear");
	const [exampleData, setExampleData] = React.useState("Linear");
	const [testingData, setTestingData] = React.useState("Linear");
	const [hiddenLayers, setHiddenLayers] = React.useState(3);
	const [neuronsPerLayer, setNeuronsPerLayer] = React.useState(64);
	const [learningRate, setLearningRate] = React.useState(0.01);
	const [epochs, setEpochs] = React.useState(100);
	const [batchSize, setBatchSize] = React.useState(32);
	const [activationFunction, setActivationFunction] = React.useState("ReLU");
	const [canGenerateData, setCanGenerateData] = React.useState(false);
	const [canTrainNetwork, setCanTrainNetwork] = React.useState(false);

	console.log("canGenerateData: ", canGenerateData);

	// Watch Data Function and Example Data to update canGenerateData
	React.useEffect(() => {
		// dataFunction and example data are set
		if (dataFunction && exampleData) {
			setCanGenerateData(true);
			console.log("canGenerateData: ", canGenerateData);
		} else {
			setCanGenerateData(false);
			console.log("canGenerateData: ", canGenerateData);
		}
	}, [dataFunction, exampleData]);

	const handleGenerateData = () => {
		// Generate scatter plot with plotly
		let data = [];
		for (let i = 0; i < exampleData; i++) {
			// Generate random x and y values
			const x = Math.random();
			const y = Math.random();
			// Generate label
			let label;
			switch (dataFunction) {
				case "Linear":
					label = x > y ? 1 : 0;
					break;
				case "Quadratic":
					label = x * x > y ? 1 : 0;
					break;
				case "Cubic":
					label = x * x * x > y ? 1 : 0;
					break;
				case "Sine":
					label = Math.sin(x * Math.PI) > y ? 1 : 0;
					break;
				case "Circle":
					label = x * x + y * y > 1 ? 1 : 0;
					break;
				case "Checkerboard":
					label = x > y ? 1 : 0;
					break;
				default:
					label = 0;
			}
			// Add data point to scatter plot
			data.push({
				x: x,
				y: y,
				label: label,
			});
		}
		// Create scatter plot
		const scatterPlot = {
			x: data.map((d) => d.x),
			y: data.map((d) => d.y),
			mode: "markers",
			type: "scatter",
			marker: {
				color: data.map((d) => d.label),
				colorscale: "Viridis",
				size: 5,
			},
		};
		// Plot scatter plot

	};

	// Watch all fields to update canTrainNetwork
	React.useEffect(() => {
		// All fields are set
		if (
			dataFunction &&
			trainingData &&
			exampleData &&
			testingData &&
			hiddenLayers &&
			neuronsPerLayer &&
			learningRate &&
			epochs &&
			batchSize &&
			activationFunction
		) {
			setCanTrainNetwork(true);
		} else {
			setCanTrainNetwork(false);
		}
	}, [
		dataFunction,
		trainingData,
		exampleData,
		testingData,
		hiddenLayers,
		neuronsPerLayer,
		learningRate,
		epochs,
		batchSize,
		activationFunction,
	]);

	return (
		<div>
			<h2>Step 2: Customize and Train a Neural Network</h2>
			<p>
				Here you can train a neural network to classify data. You can
				choose the data and the hyperparameters.
			</p>

			<Form>
				<Row>
					<Col md={6}>
						{/* Data function */}
						<FormGroup>
							<Label for="dataFunction">Data Function</Label>
							<Input
								type="select"
								name="dataFunction"
								id="dataFunction"
								onChange={(e) =>
									setDataFunction(e.target.value)
								}
							>
								<option>Linear</option>
								<option>Quadratic</option>
								<option>Cubic</option>
								<option>Sine</option>
								<option>Circle</option>
								<option>Checkerboard</option>
							</Input>
						</FormGroup>
					</Col>
					<Col md={6}>
						{/* Example data */}
						<FormGroup>
							<Label for="exampleData">Example Data</Label>
							<Input
								type="number"
								name="exampleData"
								id="exampleData"
								placeholder="e.g., 100"
								onBlur={(e) => setExampleData(e.target.value)}
							></Input>
						</FormGroup>
					</Col>
				</Row>
			</Form>
			<Button color="info" disabled={!canGenerateData} onSubmit={handleGenerateData}>
				Generate Data
			</Button>
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
							<Label for="hiddenLayers">
								Number of Hidden Layers
							</Label>
							<Input
								type="number"
								name="hiddenLayers"
								id="hiddenLayers"
								placeholder="e.g., 3"
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label for="neuronsPerLayer">
								Neurons per Layer
							</Label>
							<Input
								type="number"
								name="neuronsPerLayer"
								id="neuronsPerLayer"
								placeholder="e.g., 64"
							/>
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

					<Button color="info">Train Neural Network</Button>
				</Row>
			</Form>

			<Card className="mt-4">
				<CardBody>
					<CardTitle tag="h5">Data Visualization</CardTitle>
					{/* Visualization of the data goes here */}
				</CardBody>
			</Card>
		</div>
	);
};

export default HomeContent;
