#!/bin/bash

# Prompt for the project name
read -p "Enter the name of your React project: " project_name

# Create React app
npx create-react-app "$project_name"

# Navigate into the project directory
cd "$project_name" || exit

# Install dependencies
echo "Installing dependencies..."
npm install react react-dom react-scripts
npm install bootstrap bootstrap-icons react-router-dom reactstrap sass
npm update

# Clean up React's default files
echo "Cleaning up default files..."
rm -f src/App.test.js src/logo.svg src/setupTests.js src/reportWebVitals.js src/App.css
# Move index.css to src/styles/index.scss
mv src/index.css src/styles/index.scss
mkdir -p src/assets/constants src/assets/images src/classes src/components src/context src/pages src/styles
touch src/components/HomeContent.jsx src/context/AppContext.jsx src/pages/HomePage.jsx

# Update index.js
cat >src/index.js <<EOF
import "./styles/index.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/HomePage";
import React from "react";
import ReactDOM from "react-dom/client";

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
EOF

# Update HomePage.jsx
cat >src/pages/HomePage.jsx <<EOF
import HomeContent from "../components/HomeContent";

const HomePage = () => {
    return (
        <div className="container">
            <HomeContent />
        </div>
    );
};

export default HomePage;
EOF

# Update HomeContent.jsx
cat >src/components/HomeContent.jsx <<EOF
import React from "react";

const HomeContent = () => {
    return (
        <div className="row">
            <div className="col-12">
                <h1>Home Page</h1>
            </div>
        </div>
    );
};

export default HomeContent;
EOF

# Update AppContext.jsx
cat >src/context/AppContext.jsx <<EOF
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        // Add state here
    });

    const actions = {
        // Add actions here
    };

    return <AppContext.Provider value={{ state, actions }}>{children}</AppContext.Provider>;
};
EOF

# Git Setup
echo "Setting up Git..."
git init
git branch -m master main
echo "hide/" >>.gitignore
mkdir hide

echo "React project '$project_name' set up successfully!"
