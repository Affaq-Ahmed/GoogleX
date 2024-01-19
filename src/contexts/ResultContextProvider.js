import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-api31.p.rapidapi.com";

export const ResultContextProvider = ({ children }) => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// /videos, /search, /news, /images
	const getResults = async (type) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${baseUrl}${type}`, {
				method: "GET",
				headers: {
					"content-type": "application/json",
					"X-RapidAPI-Key":
						"fd3713d204msh44c41bd40ea8fbfp1c41a9jsnebe256f18693",
					"X-RapidAPI-Host": "google-api31.p.rapidapi.com",
				},
			});

			const data = await response.json();
			console.log(data);
			setResults(data.value);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<ResultContext.Provider
			value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
		>
			{children}
		</ResultContext.Provider>
	);
};

export const useResultContext = () => useContext(ResultContext);
