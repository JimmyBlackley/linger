import React from "react";
import { motion } from "motion/react";
import { SortableCard } from "./SortableCard";
import { Module } from "@/app/types";
import { SortableContext } from "@dnd-kit/sortable";
import { Active, useDroppable } from "@dnd-kit/core";
import { MenuItem } from "./MenuItem";

interface Props {
	className?: string;
	moduleList: Module[];
	currentDragCard: Active | null;
}
export function Palette({ className, moduleList, currentDragCard }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "palette" });
	return (
		<div className={`relative flex flex-col p-2 gap-2 bg-purple-600 ${className}`}>
			{/* drag overlay */}
			{currentDragCard?.data.current?.container === "timeline" && (
				<div className="absolute inset-0 bg-red-500 opacity-50 pointer-events-none"></div>
			)}
			{/* top bar */}
			<motion.div className="flex gap-2 justify-between">
				<MenuItem className="text-2xl">Home</MenuItem>
				<div className="flex gap-2">
					<MenuItem className="text-2xl">+</MenuItem>
					<MenuItem className="text-2xl">+</MenuItem>
					<MenuItem className="text-2xl">+</MenuItem>
					<MenuItem className="text-2xl">+</MenuItem>
				</div>
			</motion.div>
			<div className="flex gap-2 h-full">
				{/* side bar */}
				<motion.div
					className="flex flex-col gap-2 w-8 hover:w-[18rem] transition-all duration-300"
				>
					<MenuItem className="text-2xl">+</MenuItem>
					<MenuItem className="text-2xl">+</MenuItem>
					<MenuItem className="text-2xl">+</MenuItem>
					<MenuItem className="text-2xl">+</MenuItem>
				</motion.div>
				<div
					ref={setNodeRef}
					className="grid grid-cols-3 auto-rows-min w-full h-full gap-3 p-3 bg-white rounded-[14px] overflow-y-auto"
				>
					<SortableContext items={moduleList}>
						{moduleList.map((module) => {
							return (
								<SortableCard
									key={module.id}
									className={`w-full flex-shrink-0 ${
										currentDragCard?.id === module.id ? "invisible" : ""
									}`}
									container="palette"
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
		</div>
	);
}
