import React, { useEffect } from "react";
import { useResultContext } from "../contexts/ResultContextProvider";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

const Results = () => {
	const { results, isLoading, getResults, searchTerm } = useResultContext();
	const location = useLocation();
	console.log(location.pathname);

	if (isLoading) return <Loading />;

	switch (location.pathname) {
		case "/search":
			return "SEARCH";
		case "/images":
			return "IMAGES";
		default:
			return "ERROR";
	}
};

export default Results;
