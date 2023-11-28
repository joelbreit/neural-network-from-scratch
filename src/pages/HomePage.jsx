import React from "react";

import { Container } from "reactstrap";

import Header from "../components/Header";
import NeuralNetworkConfigurator from "../components/NeuralNetworkConfigurator";
import DataGenerator from "../components/DataGenerator";
import HomeContent from "../components/HomeContent";

const HomePage = () => {
	return (
		<>
			<Header />
			<Container>
				<h1>Neural Network Playground</h1>
				<NeuralNetworkConfigurator />
				<DataGenerator />
				<HomeContent />
			</Container>
		</>
	);
};

export default HomePage;
