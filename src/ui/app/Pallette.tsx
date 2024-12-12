"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ModuleCard } from "./ModuleCard";
import { v4 as uuidv4 } from "uuid";
import DropdownButton from "./DropdownButton";

interface Props {
	className?: string;
}
function Pallette({ className }: Props): JSX.Element {
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
	const [moduleList, setModuleList] = useState(defaultModuleList);
	const [currentActiveButton, setCurrentActiveButton] = useState("");
	return (
		<div className={`p-2 flex flex-col gap-2 ${className}`}>
			<motion.div className="flex justify-end gap-2">
				<DropdownButton
					className="w-8 h-8"
					currentActiveButton={currentActiveButton}
					setCurrentActiveButton={setCurrentActiveButton}
				>
					+
				</DropdownButton>
				<DropdownButton
					className="w-8 h-8"
					currentActiveButton={currentActiveButton}
					setCurrentActiveButton={setCurrentActiveButton}
				>
					+
				</DropdownButton>
			</motion.div>
			<div className="flex flex-col items-center gap-4 px-0 py-[15px] h-full w-full bg-gray-300 rounded-[14px] overflow-y-auto shadow-[inset_0px_4px_4px_#00000040]">
				{moduleList.map((module) => {
					return <ModuleCard key={module.id} className={"flex-shrink-0"} />;
				})}
			</div>
		</div>
	);
}
export default Pallette;
