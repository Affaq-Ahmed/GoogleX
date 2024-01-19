import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-api31.p.rapidapi.com";

export const ResultContextProvider = ({ children }) => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	// /videos, /search, /news, /images
	const getResults = async (type, text) => {
		setIsLoading(true);
		const ImageData = {
			text: text,
			safesearch: "off",
			region: "wt-wt",
			color: "",
			size: "",
			type_image: "",
			layout: "",
			max_results: 100,
		};
		const VideoData = {
			text: text,
			safesearch: "off",
			timelimit: "",
			duration: "",
			resolution: "",
			region: "wt-wt",
			max_results: 50,
		};
		const NewsData = {
			text: text,
			region: "wt-wt",
			max_results: 25,
		};
		const SearchData = {
			text: "zarish",
			safesearch: "off",
			timelimit: "",
			region: "wt-wt",
			max_results: 100,
		};

		const url = `${baseUrl}${type}`;
		const options = {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"X-RapidAPI-Key": "fd3713d204msh44c41bd40ea8fbfp1c41a9jsnebe256f18693",
				"X-RapidAPI-Host": "google-api31.p.rapidapi.com",
			},
			data:
				type === "/imagesearch"
					? ImageData
					: type === "/videosearch"
					? VideoData
					: type === "/"
					? NewsData
					: SearchData,
		};
		try {
			const response = await axios.request(url, options);

			console.log(response.data);
			setResults(response.data.result);
			console.log(results);
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
