import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [appState, setAppState] = useState({
		debug: false,
	});

	return (
		<AppContext.Provider value={{ appState, setAppState }}>
			{children}
		</AppContext.Provider>
	);
};