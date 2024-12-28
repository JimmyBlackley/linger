"use client";
import React, { useState } from "react";
import { closestCorners, DndContext, DragEndEvent, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import NavPill from "@/app/ui/app/NavPill";
import Pallette from "@/app/ui/app/Pallette";
import Timeline from "@/app/ui/app/Timeline";
import ContentArea from "@/app/ui/app/ContentArea";

function App(): JSX.Element {
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
	return (
		<div className="grid grid-cols-[30vw_1fr] grid-rows-[8vh_72vh_20vh] h-screen bg-variable-collection-bg-grey border">
			{/* header container*/}
			<div className="flex justify-between items-stretch gap-2.5 p-2.5  w-full col-span-2 border-b border-black ">
				<div className="gap-2.5 pl-0 py-0 inline-flex items-center relative flex-[0_0_auto]">
					<NavPill className="!flex-[0_0_auto]" label="Products" state="active" />
					<NavPill className="!flex-[0_0_auto]" label="Solutions" state="default" />
					<NavPill className="!flex-[0_0_auto]" label="Community" state="default" />
					<NavPill className="!flex-[0_0_auto]" label="Resources" state="default" />
				</div>
				{/* place holder for search bar */}
				<div className="w-[264px] bg-white rounded-[27px]" />
			</div>

			<DndContext
				id={"unique-dnd-context-id-to-fix-nextjs-hydration-error-for-some-reason-dont-touch"}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				collisionDetection={closestCorners}
			>
				<Pallette className="w-full row-span-2 border-r border-black" />
				{/* place holder for working area */}
				<ContentArea content={content} setContent={setContent} activeId={activeId}></ContentArea>
				<Timeline className="!self-stretch !w-full border-t border-black" />
			</DndContext>
		</div>
	);
}

export default App;
