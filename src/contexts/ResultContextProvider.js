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
		text = "zarish nayyab gull";
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
			text: text,
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
				// "X-RapidAPI-Key": "e436de99a6msh19927ac5c9002e8p1ed538jsnecefc573ccd4",
				// "X-RapidAPI-Host": "google-api31.p.rapidapi.com",
			},
			data:
				type === "/imagesearch"
					? ImageData
					: type === "/videosearch"
					? VideoData
					: type === "/websearch"
					? SearchData
					: NewsData,
		};
		try {
			const response = await axios.request(url, options);

			console.log(response.data);
			if (type === "/") {
				setResults(response.data.news);
			} else {
				setResults(response.data.result);
			}
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
