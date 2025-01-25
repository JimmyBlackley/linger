import React from "react";
import { SortableCard } from "./SortableCard";
import { Question } from "@prisma/client";
import { SortableContext } from "@dnd-kit/sortable";
import { Active, useDroppable } from "@dnd-kit/core";
import { MenuItem } from "./MenuItem";
import { motion } from "motion/react";

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
		<div className={`relative p-2 grid grid-cols-[2rem_1fr] grid-rows-[2rem_1fr] gap-2 bg-purple-600 ${className}`}>
			{/* drag overlay */}
			{currentDragCard?.data.current?.container === "timeline" && (
				<div className="absolute inset-0 bg-red-500 opacity-50 pointer-events-none"></div>
			)}
			{/* top bar */}
			<MenuItem className="text-2xl">Home</MenuItem>
			<div className="flex justify-end gap-2">
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
			</div>
			{/* side bar */}
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="relative flex flex-col gap-2 w-8"
			>
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
				<MenuItem className="text-2xl">+</MenuItem>
				{/* sidebar text for icons */}
				<motion.div
					animate={{ width: isSidebarExpanded ? "15rem" : "0" }}
					transition={{ duration: 0.3 }}
					className="absolute flex flex-col gap-2 top-0 left-full h-full overflow-hidden bg-purple-600"
				></motion.div>
			</div>
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