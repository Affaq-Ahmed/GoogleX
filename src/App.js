import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes } from "./components/Routes";
import Footer from "./components/Footer";
import "./global.css";

const App = () => {
	const [darkTheme, setDarkTheme] = useState(true);

	return (
		<div className={darkTheme ? "dark" : ""}>
			<Navbar />
			<Routes />
			<Footer />
		</div>
	);
};

export default App;
