import { useState } from "react";
import { SortableCard } from "./SortableCard";
import { DragOverlayCard } from "./DragOverlayCard";
import { closestCorners, DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Item } from "@/app/types";

interface Props {
	children?: React.ReactNode;
	content: Item[];
	setContent: React.Dispatch<React.SetStateAction<Item[]>>;
	activeId: UniqueIdentifier | null;
}

function ContentArea({ children, content, setContent, activeId}: Props): JSX.Element {
	function handleDragOverlay() {
		const activeItem = content.find((item) => item.id === activeId);
		if (activeItem) {
			return (
				<DragOverlayCard key={activeItem.id} className={`w-full`}>
					{activeItem.name}
				</DragOverlayCard>
			);
		}
	}
	return (
		<>
			<SortableContext items={content}>
				<div className="grid grid-cols-3 auto-rows-min gap-3 p-3 overflow-y-auto">
					{content.map((item) => {
						return (
							<SortableCard
								key={item.id}
								id={item.id}
								className={`w-full ${activeId === item.id ? "invisible" : ""}`}
							>
								{item.name}
							</SortableCard>
						);
					})}
					{children}
				</div>
			</SortableContext>
			<DragOverlay>{handleDragOverlay()}</DragOverlay>
		</>
	);
}

export default ContentArea;
