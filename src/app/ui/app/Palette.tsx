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
		<div className={`relative p-2 grid grid-cols-[2rem_1fr] grid-rows-[2rem_1fr] gap-2 bg-purple-600 ${className}`}>
			{currentDragCard?.data.current?.container === "timeline" && (
				<div className="absolute inset-0 bg-red-500 opacity-50 pointer-events-none"></div>
			)}
			<motion.div className="row-span-2 flex flex-col gap-2">
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
			</motion.div>

			<motion.div className="flex justify-end gap-2">
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
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
	);
}
