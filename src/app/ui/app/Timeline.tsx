import { Question } from "@/app/types";
import { Active, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import React from "react";
import { SortableCard } from "./SortableCard";

interface Props {
	className?: string;
	timelineContentList: Question[];
	currentDragCard: Active | null;
	children?: React.ReactNode;
}

export function Timeline({ className, timelineContentList, currentDragCard, children }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "timeline" });
	return (
		/* outer box */
		<div ref={setNodeRef} className={`shadow-[0px_-4px_4px_#00000040] h-200px p-[15px] relative ${className}`}>
			{currentDragCard?.data.current?.container === "palette" && (
				<div className="absolute inset-0 bg-green-500 opacity-50 pointer-events-none z-10"></div>
			)}
			<div className="h-full w-full grow bg-white rounded-[14px] overflow-x-scroll">
				<SortableContext items={timelineContentList}>
					<div className="h-full grid grid-flow-col grid-rows-1 auto-cols-min items-center gap-3 p-3 overflow-x-auto">
						{timelineContentList.map((timelineContent) => {
							return (
								<SortableCard
									key={timelineContent.id}
									id={timelineContent.id}
									container="timeline"
									text={timelineContent.text}
									className={`w-full ${
										currentDragCard?.id === timelineContent.id ? "invisible" : ""
									}`}
								>
									{timelineContent.text}
								</SortableCard>
							);
						})}
						{children}
					</div>
				</SortableContext>
			</div>
		</div>
	);
}
