import { Question } from "@/app/types";
import { Active, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { motion } from "motion/react";
import React from "react";
import { MenuItem } from "./MenuItem";
import { SortableCard } from "./SortableCard";

interface Props {
	className?: string;
	questions: Question[];
	currentDragCard: Active | null;
}
export function Palette({ className, questions, currentDragCard }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "palette" });
	const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(false);

	function handleMouseEnter() {
		setIsSidebarExpanded(true);
	}
	function handleMouseLeave() {
		setIsSidebarExpanded(false);
	}

	return (
		<div className={`relative p-2 grid grid-cols-[3rem_1fr] grid-rows-[2rem_1fr] gap-2 bg-purple-600 ${className}`}>
			{/* drag overlay */}
			{currentDragCard?.data.current?.container === "timeline" && (
				<div className="absolute inset-0 bg-red-500 opacity-50 pointer-events-none z-10"></div>
			)}
			{/* top bar */}
			<MenuItem className="rounded-md">Home</MenuItem>
			<div className="flex justify-end gap-2">
				<MenuItem className="text-2xl w-8 rounded-md">+</MenuItem>
				<MenuItem className="text-2xl w-8 rounded-md">+</MenuItem>
				<MenuItem className="text-2xl w-8 rounded-md">+</MenuItem>
				<MenuItem className="text-2xl w-8 rounded-md">+</MenuItem>
			</div>
			{/* side bar */}
			<motion.div
				whileHover={{ width: "15rem", paddingRight: "0.5rem" }}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={`relative flex flex-col gap-2 w-8 bg-purple-600 overflow-hidden`}
			>
				<MenuItem className="w-full h-8 rounded-md flex">
					<div className={`min-w-10 text-2xl`}>+</div>
					{isSidebarExpanded && (
						<div className="whitespace-nowrap flex items-center text-xl">Multiple Choice</div>
					)}
				</MenuItem>
				<MenuItem className="w-full h-8 rounded-md flex">
					<div className="min-w-10 text-2xl">+</div>
					{isSidebarExpanded && <div className="whitespace-nowrap flex items-center text-xl">Slider</div>}
				</MenuItem>
				<MenuItem className="w-full h-8 rounded-md flex">
					<div className="min-w-10 text-2xl">+</div>
					{isSidebarExpanded && <div className="whitespace-nowrap flex items-center text-xl">True False</div>}
				</MenuItem>
				<MenuItem className="w-full h-8 rounded-md flex">
					<div className="min-w-10 text-2xl">+</div>
					{isSidebarExpanded && <div className="whitespace-nowrap flex items-center text-xl">Map</div>}
				</MenuItem>
			</motion.div>
			<div
				ref={setNodeRef}
				className="grid grid-cols-3 auto-rows-min w-full h-full gap-3 p-3 bg-white rounded-[14px] overflow-y-auto"
			>
				<SortableContext items={questions}>
					{questions.map((question) => {
						return (
							<SortableCard
								key={question.id}
								className={`w-full flex-shrink-0 ${
									currentDragCard?.id === question.id ? "invisible" : ""
								}`}
								container="palette"
								text={question.text}
								id={question.id}
							>
								{question.text}
							</SortableCard>
						);
					})}
				</SortableContext>
			</div>
		</div>
	);
}
