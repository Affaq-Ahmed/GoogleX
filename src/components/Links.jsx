import React from "react";
import { NavLink } from "react-router-dom";

const links = [
	{
		to: "/search",
		text: "🔎 All",
	},
	{
		to: "/images",
		text: "📷 Images",
	},
	{
		to: "/news",
		text: "📰 News",
	},
	{
		to: "/videos",
		text: "📹 Videos",
	},
];

const Links = () => {
	return (
		<div className="flex sm:justify-around justify-between items-center mt-4">
			{links.map(({ to, text }, index) => (
				<NavLink
					key={index}
					to={to}
					className={({ isActive }) =>
						isActive
							? "text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2"
							: ""
					}
				>
					{text}
				</NavLink>
			))}
		</div>
	);
};

export default Links;
