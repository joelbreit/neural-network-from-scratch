import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppProvider } from "./context/AppContext";

import HomePage from "./pages/HomePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AppProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	</AppProvider>
);
