import { useState } from "react";
import { SortableCard } from "./SortableCard";
import { DragOverlayCard } from "./DragOverlayCard";
import { v4 as uuidv4 } from "uuid";
import { closestCorners, DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

interface Props {
	children?: React.ReactNode;
}

function ContentArea({ children }: Props): JSX.Element {
	const [content, setContent] = useState([
		{ id: uuidv4(), name: "This is a module filled with content" },
		{ id: uuidv4(), name: "Test content" },
		{ id: uuidv4(), name: "Another test content" },
		{ id: uuidv4(), name: "Yet another test content" },
	]);
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	function handleDragStart(e: DragStartEvent) {
		const { active } = e;
		setActiveId(e.active.id);
	}
	function handleDragEnd(e: DragEndEvent) {
		const { active, over } = e;
		setActiveId(null);
		if (over && active.id !== over.id) {
			setContent((content) => {
				const oldIndex = content.findIndex((item) => item.id === active.id);
				const newIndex = content.findIndex((item) => item.id === over.id);
				return arrayMove(content, oldIndex, newIndex);
			});
		}
	}
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
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
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
		</DndContext>
	);
}

export default ContentArea;
