import React, { useEffect } from "react";
import { useResultContext } from "../contexts/ResultContextProvider";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import ReactPlayer from "react-player";

const Results = () => {
	const { results, isLoading, getResults, searchTerm } = useResultContext();
	const location = useLocation();
	console.log(location.pathname);

	useEffect(() => {
		if (!searchTerm) {
			console.log("searchTerm: ", searchTerm);
			const pathToEndpointMap = {
				"/search": "/websearch",
				"/images": "/imagesearch",
				"/news": "/",
				"/videos": "/videosearch",
			};

			const endpoint = pathToEndpointMap[location.pathname];

			if (endpoint) {
				getResults(endpoint, searchTerm);
			}
		}
	}, [searchTerm, location.pathname]);

	if (isLoading) return <Loading />;

	switch (location.pathname) {
		case "/search":
			return (
				<div className="flex flex-wrap justify-between space-y-6 sm:px-56">
					{results?.map(({ href, title, body }, index) => (
						<div key={index} className="md:w-2/5 w-full">
							<a href={href} target="_blank" rel="noreferrer">
								<p className="text-sm">
									{href.length > 30 ? href.substring(0, 30) : href}
								</p>
								<p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
									{title}
								</p>
								<p className="text-sm">
									{body.length > 60 ? body.substring(0, 60) : body}
								</p>
							</a>
						</div>
					))}
				</div>
			);
		case "/images":
			return (
				<div className="flex flex-wrap justify-center items-center">
					{results?.map(({ image, title, thumbnail, url }, index) => (
						<a
							className="sm:p-3 p-5"
							key={index}
							href={url}
							target="_blank"
							rel="noreferrer"
						>
							<img
								src={image?.src || thumbnail?.src}
								alt={title}
								loading="lazy"
							/>
							<p className="w-36 break-words text-sm mt-2">{title}</p>
						</a>
					))}
				</div>
			);
		case "/news":
			return (
				<div className="flex flex-wrap justify-between items-center space-y-6 sm:px-56">
					{results?.map(({ date, body, title, url, image, source }, index) => (
						<div key={index} className="md:w-2/5 w-full">
							<a
								href={url}
								target="_blank"
								rel="noreferrer"
								className="hover:underline"
							>
								<p className="text-sm">
									{url.length > 30 ? url.substring(0, 30) : url}
								</p>
								<p className="text-lg dark:text-blue-300 text-blue-700">
									{title}
								</p>
								<p className="text-sm">
									{body.length > 100 ? body.substring(0, 100) : body}
								</p>
							</a>
							<div className="flex gap-4">
								<p className="text-sm">{source}</p>
								<p className="text-sm">{date}</p>
							</div>
						</div>
					))}
				</div>
			);
		case "/videos":
			return (
				<div className="flex flex-wrap">
					{results?.map(({ content, description }, index) => (
						<div key={index} className="p-2">
							<ReactPlayer
								url={content}
								controls
								width="355px"
								height="200px"
							/>
						</div>
					))}
				</div>
			);
		default:
			return "ERROR";
	}
};

export default Results;
