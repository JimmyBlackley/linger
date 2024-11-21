"use client";

import React from "react";
import { ModuleCard } from "./ModuleCard";
import { v4 as uuidv4 } from "uuid";

interface Props {
	className: string;
}

export const Pallette = ({ className }: Props): JSX.Element => {
	let defaultModuleList = [
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
		{ id: uuidv4() },
	];
	const [moduleList, setModuleList] = React.useState(defaultModuleList);
	return (
		<div className={`p-[15px] ${className}`}>
			<div className="flex flex-col items-center gap-4 px-0 py-[15px] h-full w-full bg-white rounded-[14px] overflow-y-auto shadow-[inset_0px_4px_4px_#00000040]">
				{moduleList.map((module) => {
					return <ModuleCard key={module.id} className={"flex-shrink-0"} />;
				})}
			</div>
		</div>
	);
};
