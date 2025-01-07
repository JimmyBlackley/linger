import React, { useState } from "react";
import { motion } from "motion/react";
import { SortableCard } from "./SortableCard";
import { DropdownButton } from "./DropdownButton";
import { Module } from "@/app/types";
import { SortableContext } from "@dnd-kit/sortable";
import { Active, useDroppable } from "@dnd-kit/core";

interface Props {
	className?: string;
	moduleList: Module[];
	currentDragCard: Active | null;
}
function Pallette({ className, moduleList, currentDragCard }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "pallete" });
	const [currentActiveButtonId, setCurrentActiveButtonId] = useState("");
	return (
		<div className={`relative p-2 flex flex-col gap-2 ${className}`}>
			{currentDragCard?.data.current?.container === "contentArea" && (
				<div className="absolute inset-0 bg-red-500 opacity-50  pointer-events-none"></div>
			)}
			<motion.div className="flex justify-end gap-2">
				<DropdownButton
					className="w-8 h-8 text-2xl"
					currentActiveButtonId={currentActiveButtonId}
					setCurrentActiveButtonId={setCurrentActiveButtonId}
				>
					+
				</DropdownButton>
				<DropdownButton
					className="w-8 h-8 text-2xl"
					currentActiveButtonId={currentActiveButtonId}
					setCurrentActiveButtonId={setCurrentActiveButtonId}
				>
					+
				</DropdownButton>
			</motion.div>
			<div
				ref={setNodeRef}
				className="flex flex-col items-center gap-4 px-0 py-[15px] h-full w-full bg-gray-300 rounded-[14px] overflow-y-auto shadow-[inset_0px_4px_4px_#00000040]"
			>
				<SortableContext items={moduleList}>
					{moduleList.map((module) => {
						return (
							<SortableCard
								key={module.id}
								className={`flex-shrink-0 ${currentDragCard?.id === module.id ? "invisible" : ""}`}
								container="pallete"
								name={module.name}
								id={module.id}
							>
								{module.name}
							</SortableCard>
						);
					})}
				</SortableContext>
			</div>
		</div>
	);
}
export default Pallette;
