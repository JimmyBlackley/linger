"use client";
import React, { useState } from "react";
import { closestCorners, DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import NavPill from "@/app/ui/app/NavPill";
import Pallette from "@/app/ui/app/Pallette";
import Timeline from "@/app/ui/app/Timeline";
import ContentArea from "@/app/ui/app/ContentArea";
import { Content, Module } from "../types";
import { DragOverlayCard } from "../ui/app/DragOverlayCard";

function App(): JSX.Element {
	const [contentList, setContentList] = useState<Content[]>([
		{ id: uuidv4(), name: "This is a module filled with content" },
		{ id: uuidv4(), name: "Test content" },
		{ id: uuidv4(), name: "Another test content" },
		{ id: uuidv4(), name: "Yet another test content" },
	]);
	const [moduleList, setModuleList] = useState<Module[]>([
		{ id: uuidv4(), name: "Module 1" },
		{ id: uuidv4(), name: "Module 2" },
		{ id: uuidv4(), name: "Module 3" },
		{ id: uuidv4(), name: "Module 4" },
		{ id: uuidv4(), name: "Module 5" },
		{ id: uuidv4(), name: "Module 6" },
		{ id: uuidv4(), name: "Module 7" },
		{ id: uuidv4(), name: "Module 8" },
		{ id: uuidv4(), name: "Module 9" },
		{ id: uuidv4(), name: "Module 10" },
	]);
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	function handleDragStart(e: DragStartEvent) {
		const { active } = e;
		setActiveId(e.active.id);
	}
	function handleDragEnd(e: DragEndEvent) {
		const { active, over } = e;
		setActiveId(null);
		if (active.data.current?.type === "content") {
			if (over && over.data.current?.type === "content") {
				setContentList((contentList) => {
					const oldIndex = contentList.findIndex((content) => content.id === active.id);
					const newIndex = contentList.findIndex((content) => content.id === over.id);
					return arrayMove(contentList, oldIndex, newIndex);
				});
			}
		}
		if (active.data.current?.type === "module") {
			if (over && over.data.current?.type === "module") {
				setModuleList((moduleList) => {
					const oldIndex = moduleList.findIndex((module) => module.id === active.id);
					const newIndex = moduleList.findIndex((module) => module.id === over.id);
					return arrayMove(moduleList, oldIndex, newIndex);
				});
			}
		}
	}
	function handleDragOverlay() {
		let activeCard = contentList.find((content) => content.id === activeId);
		if (!activeCard) {
			activeCard = moduleList.find((module) => module.id === activeId);
		}
		if (activeCard) {
			return (
				<DragOverlayCard key={activeCard.id} className={`w-full`}>
					{activeCard.name}
				</DragOverlayCard>
			);
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
				<Pallette
					moduleList={moduleList}
					activeId={activeId}
					className="w-full row-span-2 border-r border-black"
				/>
				<ContentArea contentList={contentList} activeId={activeId}></ContentArea>
				<Timeline className="!self-stretch !w-full border-t border-black" />
				<DragOverlay>{handleDragOverlay()}</DragOverlay>
			</DndContext>
		</div>
	);
}

export default App;
