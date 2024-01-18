import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ResultContextProvider } from "./contexts/ResultContextProvider";

const rootElement = ReactDOM.createRoot(document.getElementById("root"));

rootElement.render(
	<React.StrictMode>
		<ResultContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ResultContextProvider>
	</React.StrictMode>
);
