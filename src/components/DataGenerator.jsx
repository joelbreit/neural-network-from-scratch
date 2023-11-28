import {
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import React from "react";
import { Scatter } from "react-chartjs-2";
import {
	Card,
	CardBody,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
} from "reactstrap";

ChartJS.register(
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const DataGenerator = () => {
	const [dataFunction, setDataFunction] = React.useState("linear");
	const [numPoints, setNumPoints] = React.useState(50);
	const [scatterData, setScatterData] = React.useState([]);
	const [plotOptions, setPlotOptions] = React.useState();
	const [data, setData] = React.useState({ datasets: [] });

	const lineFunction = {
		linear: (x) => x,
		quadratic: (x) => x * x,
		cubic: (x) => x * x * x,
		sine: (x) => Math.sin(x * Math.PI),
	};

	React.useEffect(() => {
		setPlotOptions({
			scales: {
				x: { title: { display: true, text: "x" }, min: 0, max: 1 },
				y: { title: { display: true, text: "y" }, min: 0, max: 1 },
			},
		});

		let points = [];
		for (let i = 0; i < numPoints; i++) {
			const x = Math.random();
			const y = Math.random();
			const pointColor =
				lineFunction[dataFunction](x) > y
					? "rgba(255, 99, 132, 1)"
					: "rgba(54, 162, 235, 1)";
			points.push({ x, y, pointBackgroundColor: pointColor });
		}
		setScatterData(points);

		const lineData = Array.from({ length: 100 }, (_, i) => {
			const x = i / 99;
			return { x, y: lineFunction[dataFunction](x) };
		});

		setData({
			datasets: [
				{
					label: "Data Points",
					data: points,
					backgroundColor: points.map((p) => p.pointBackgroundColor),
				},
				{
					label: `Function: ${dataFunction}`,
					data: lineData,
					type: "line",
					borderColor: "rgba(0, 0, 0, 0.5)",
					borderWidth: 1,
					fill: false,
					pointRadius: 0,
				},
			],
		});
	}, [dataFunction, numPoints]);

	React.useEffect(() => {
		switch (dataFunction) {
			case "linear":
				setData({
					datasets: [
						{
							label: "Data Points",
							data: scatterData,
							backgroundColor: scatterData.map(
								(p) => p.pointBackgroundColor
							),
						},
						{
							label: "y = x",
							data: Array.from({ length: 100 }, (_, i) => ({
								x: i / 99,
								y: i / 99,
							})), // Line data
							type: "line", // Render this dataset as a line
							borderColor: "rgba(0, 0, 0, 0.5)", // Line color
							borderWidth: 1,
							fill: false,
							pointRadius: 0, // Hide points on the line
						},
					],
				});
				break;
			case "quadratic":
				setData({
					datasets: [
						{
							label: "Data Points",
							data: scatterData,
							backgroundColor: scatterData.map(
								(p) => p.pointBackgroundColor
							),
						},
						{
							label: "y = x^2",
							data: Array.from({ length: 100 }, (_, i) => ({
								x: i / 99,
								y: (i / 99) * (i / 99),
							})), // Line data
							type: "line", // Render this dataset as a line
							borderColor: "rgba(0, 0, 0, 0.5)", // Line color
							borderWidth: 1,
							fill: false,
							pointRadius: 0, // Hide points on the line
						},
					],
				});
				break;
			case "cubic":
				setData({
					datasets: [
						{
							label: "Data Points",
							data: scatterData,
							backgroundColor: scatterData.map(
								(p) => p.pointBackgroundColor
							),
						},
						{
							label: "y = x^3",
							data: Array.from({ length: 100 }, (_, i) => ({
								x: i / 99,
								y: (i / 99) * (i / 99) * (i / 99),
							})), // Line data
							type: "line", // Render this dataset as a line
							borderColor: "rgba(0, 0, 0, 0.5)", // Line color
							borderWidth: 1,
							fill: false,
							pointRadius: 0, // Hide points on the line
						},
					],
				});
				break;
			case "sine":
				setData({
					datasets: [
						{
							label: "Data Points",
							data: scatterData,
							backgroundColor: scatterData.map(
								(p) => p.pointBackgroundColor
							),
						},
						{
							label: "y = sin(x)",
							data: Array.from({ length: 100 }, (_, i) => ({
								x: i / 99,
								y: Math.sin((i / 99) * Math.PI),
							})), // Line data
							type: "line", // Render this dataset as a line
							borderColor: "rgba(0, 0, 0, 0.5)", // Line color
							borderWidth: 1,
							fill: false,
							pointRadius: 0, // Hide points on the line
						},
					],
				});
				break;
			default:
				setData({
					datasets: [
						{
							label: "Data Points",
							data: scatterData,
							backgroundColor: scatterData.map(
								(p) => p.pointBackgroundColor
							),
						},
						{
							label: "y = x",
							data: Array.from({ length: 100 }, (_, i) => ({
								x: i / 99,
								y: i / 99,
							})), // Line data
							type: "line", // Render this dataset as a line
							borderColor: "rgba(0, 0, 0, 0.5)", // Line color
							borderWidth: 1,
							fill: false,
							pointRadius: 0, // Hide points on the line
						},
					],
				});
		}
	}, [scatterData, dataFunction]);

	return (
		<div>
			<h2>Step 1: Generate Data</h2>
			<p>Generate data points based on a selected function.</p>

			<Form>
				<Row>
					<Col md={6}>
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
								<option value="linear">Linear (y = x)</option>
								<option value="quadratic">
									Quadratic (y = x^2)
								</option>
								<option value="cubic">Cubic (y = x^3)</option>
								<option value="sine">Sine (y = sin(x))</option>
							</Input>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label for="numPoints">Number of Points</Label>
							<Input
								type="number"
								name="numPoints"
								id="numPoints"
								value={numPoints}
								onChange={(e) => setNumPoints(e.target.value)}
							/>
						</FormGroup>
					</Col>
				</Row>
			</Form>

			<Card className="mt-4">
				<CardBody>
					<Scatter data={data} options={plotOptions} />
				</CardBody>
			</Card>
		</div>
	);
};

export default DataGenerator;
