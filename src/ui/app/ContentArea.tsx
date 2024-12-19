import React, { useRef, useState } from "react";
import ModuleCard from "./ModuleCard";
import { v4 as uuidv4 } from "uuid";
import { motion } from "motion/react";

interface Props {
	children?: React.ReactNode;
}
interface Item {
	id: string;
	name?: string;
}

function ContentArea({ children }: Props): JSX.Element {
	const [content, setContent] = useState<Item[]>([
		{ id: uuidv4(), name: "This is a module filled with content" },
		{ id: uuidv4(), name: "Test content" },
		{ id: uuidv4(), name: "Another test content" },
		{ id: uuidv4(), name: "Yet another test content" },
	]);
	const [currentDragItem, setCurrentDragItem] = useState<Item | null>(null);
	/* function as dragStart because browser copy current element to use as drag ghost when dragStart procs */
	function drag(e: MouseEvent | TouchEvent | PointerEvent, item: Item) {
		setCurrentDragItem(item);
	}
	let lastDragOverTime = useRef(0);

	/* switching items on drag over */
	function dragOver(e: React.DragEvent, item: Item) {
		/* prevent dragOver animation from overlapping */
		if (Date.now() - lastDragOverTime.current < 200) {
			return;
		}
		lastDragOverTime.current = Date.now();

		if (currentDragItem) {
			setContent((content) => {
				const currentDragItemIndex = content.findIndex((arrayItem) => arrayItem.id === currentDragItem.id);
				const itemToReplaceIndex = content.findIndex((arrayItem) => arrayItem.id === item.id);
				const newContent = [...content];
				const [removedItem] = newContent.splice(currentDragItemIndex, 1);
				newContent.splice(itemToReplaceIndex, 0, removedItem);
				return newContent;
			});
		}
	}
	function dragEnd() {
		setCurrentDragItem(null);
		document.removeEventListener("dragover", preventDefault);
		document.removeEventListener("drop", preventDefault);
	}
	/* prevent default on drop behaviour to disable drag ghost snapping back to original position*/
	function preventDefault(e: DragEvent) {
		e.preventDefault();
	}

	return (
		<motion.div className="grid grid-cols-3 auto-rows-min gap-3 p-3 overflow-y-auto">
			{content.map((item) => {
				return (
					<motion.div
						layout
						transition={{ duration: 0.2 }}
						draggable
						key={item.id}
						className={`w-full ${currentDragItem && currentDragItem.id === item.id ? "invisible" : ""}`}
						onDragStart={(e) => {
							document.addEventListener("dragover", preventDefault);
							document.addEventListener("drop", preventDefault);
						}}
						onDrag={(e) => {
							drag(e, item);
						}}
						onDragOver={(e) => {
							dragOver(e, item);
						}}
						onDragEnd={dragEnd}
					>
						<ModuleCard className={`w-full`}>{item.name}</ModuleCard>
					</motion.div>
				);
			})}
			{children}
		</motion.div>
	);
}

export default ContentArea;
