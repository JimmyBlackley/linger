import { SortableContext } from "@dnd-kit/sortable";
import React from "react";
import { SortableCard } from "./SortableCard";
import { TimelineContent } from "@/app/types";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";

interface Props {
	className?: string;
	timelineContentList: TimelineContent[];
	activeId: UniqueIdentifier | null;
	children?: React.ReactNode;
}

function Timeline({ className, timelineContentList, activeId, children }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "timeline" });
	return (
		/* outer box */
		<div ref={setNodeRef} className={`h-200px p-[15px] relative ${className}`}>
			{/* // inner shadow box */}
			<div className="h-full w-full grow bg-white rounded-[14px] shadow-[inset_0px_4px_4px_#00000040] overflow-x-scroll">
				<SortableContext items={timelineContentList}>
					<div className="h-full grid grid-flow-col grid-rows-1 auto-cols-min items-center gap-3 p-3 overflow-x-auto">
						{timelineContentList.map((timelineContent) => {
							return (
								<SortableCard
									key={timelineContent.id}
									id={timelineContent.id}
									container="timeline"
									name={timelineContent.name}
									className={`w-full ${activeId === timelineContent.id ? "invisible" : ""}`}
								>
									{timelineContent.name}
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
export default Timeline;
