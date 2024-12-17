import { useState } from "react";
import ModuleCard from "./ModuleCard";
import { v4 as uuidv4 } from "uuid";
import { motion } from "motion/react";

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
	const [currentDragItemID, setCurrentDragItemID] = useState<string | null>(null);

	function dragging(e: React.DragEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.visibility = "hidden";
	}
	function dragEnd(e: React.DragEvent) {
		const target = e.currentTarget as HTMLElement;
		target.style.visibility = "visible";
	}

	return (
		<div
			className="grid grid-cols-3 auto-rows-min gap-3 p-3 overflow-y-auto"
			/* prevent default on drop behaviour to disable drag ghost snapping back to original position*/
			onDragOver={(e) => {
				e.preventDefault();
			}}
			onDrop={(e) => {
				e.preventDefault();
			}}
		>
			{content.map((item) => {
				return (
					<div
						draggable
						key={item.id}
						className={`w-full`}
						onDragStart={(e) => {
							const target = e.currentTarget as HTMLElement;
							setCurrentDragItemID(item.id);
						}}
						onDragOver={(e) => {
							if (currentDragItemID) {
								const currentDragItemIndex = content.findIndex(
									(arrayItem) => arrayItem.id === currentDragItemID
								);
								const itemToReplaceIndex = content.findIndex((arrayItem) => arrayItem.id === item.id);
								const newContent = [...content];
								const [removedItem] = newContent.splice(currentDragItemIndex, 1);
								newContent.splice(itemToReplaceIndex, 0, removedItem);
								setContent(newContent);
							}
						}}
						onDrag={dragging}
						onDragEnd={dragEnd}
					>
						<ModuleCard className={`w-full`}>{item.name}</ModuleCard>
					</div>
				);
			})}
			{children}
		</div>
	);
}

export default ContentArea;
