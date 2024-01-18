import React, { useEffect } from "react";
import { useResultContext } from "../contexts/ResultContextProvider";

const Results = () => {
	const { results, isLoading, getResults, searchTerm } = useResultContext();
	useEffect(() => {}, []);
	return <div>Results</div>;
};

export default Results;
