# Setup Process

## Create the Project

1. Navigate to parent folder of project (do not create a new folder)
2. Create React app (this will create a new folder)
    1. `npx create-react-app neural-network-from-scratch`
3. Install dependencies
    1. Run `npm install react react-dom react-scripts`
        1. react and for compartmentalizing code
        2. react-dom for rendering
        3. react-scripts for running the app
    2. Run `npm install bootstrap bootstrap-icons react-router-dom reactstrap sass`
        1. bootstrap for styling
        2. bootstrap-icons for icons
        3. react-router-dom for routing between pages
        4. reactstrap for bootstrap components
        5. sass for color variable overrides
    3. (Theoretically, the above two commands could be combined, but I have run into reproducable issues when I do that)
    4. Run `npm install chart.js react-chartjs-2`
        1. chart.js for charts
        2. react-chartjs-2 for react integration
    5. ~~Run `npm install react-force-graph`~~
        1. ~~react-force-graph for force graphs~~
     6. Run `npm install vis-network`
        1. vis-network for network graphs
4. Run `npm update`

## Clean Up React's Default Files

When you have setup the project the structure will look something like this:

```Log
.
├── README.md
├── docs
│   └── Setup.md
├── hide
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── assets
    │   ├── constants
    │   └── images
    ├── classes
    ├── components
    │   └── HomeContent.jsx
    ├── context
    │   └── AppContext.jsx
    ├── index.js
    ├── pages
    │   └── HomePage.jsx
    └── styles
        └── index.scss
```

1. Replace the files in ./public
2. Update the title tag in ./public/index.html
3. Update the meta description and meta theme-color in ./public/index.html
4. Update the name in manifest.json
5. Delete App.js and App.css (App.js isn't necessary, and I prefer putting files in meaningful folders)
6. Move .css files to ./styles, rename to .scss, and update imports (.scss files use sass and allow for variables)
7. Add a home page, home content, and app context
8. Replace index.js with:

```JavaScript
import "bootstrap/dist/css/bootstrap.min.css";
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
```

6. Remove extra .js files
7. Format files (Option + Shift + F)

## Git Setup

1. Change default branch to main

-   `git branch -m master main`

2. Add hide/ to .gitignore
3. Add an hide/ folder
4. Commit changes
5. Publish branch

## Run Locally

1. Run `npm start`
