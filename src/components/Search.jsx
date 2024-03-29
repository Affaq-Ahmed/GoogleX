import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useResultContext } from "../contexts/ResultContextProvider";
import Links from "./Links";

const Search = () => {
	const [text, setText] = useState("Elon Musk");
	const { setSearchTerm } = useResultContext();
	const [debouncedValue] = useDebounce(text, 1000);

	useEffect(() => {
		if (debouncedValue) setSearchTerm(debouncedValue);
	}, [debouncedValue]);

	return (
		<div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
			<input
				type="text"
				value={text}
				className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
				placeholder="Search Google X or type URL"
				onChange={(e) => setText(e.target.value)}
			/>
			{text && (
				<button
					onClick={() => setText("")}
					className="absolute top-1.5 right-4 text-2xl text-gray-500 hover:text-gray-800"
				>
					X
				</button>
			)}
			<Links />
		</div>
	);
};

export default Search;
