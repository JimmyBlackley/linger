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
		<div className={`relative p-2 grid grid-cols-[2rem_1fr] grid-rows-[2rem_1fr] gap-2 bg-purple-600 ${className}`}>
			{currentDragCard?.data.current?.container === "contentArea" && (
				<div className="absolute inset-0 bg-red-500 opacity-50  pointer-events-none"></div>
			)}
			<div className="row-span-2"></div>

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
				className="grid grid-cols-3 auto-rows-min gap-3 p-3 h-full w-full bg-white rounded-[14px] overflow-y-auto"
			>
				<SortableContext items={moduleList}>
					{moduleList.map((module) => {
						return (
							<SortableCard
								key={module.id}
								className={`w-full flex-shrink-0 ${currentDragCard?.id === module.id ? "invisible" : ""}`}
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
