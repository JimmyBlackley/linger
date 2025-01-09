"use client";
import React, { useState } from "react";
import {
	Active,
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import Pallette from "@/app/ui/app/Pallette";
import Timeline from "@/app/ui/app/Timeline";
import ContentArea from "@/app/ui/app/ContentArea";
import { Content, Module } from "../types";
import { DragOverlayCard } from "../ui/app/DragOverlayCard";
import { createContent } from "../lib/app/createContent";
import { addToTimeline } from "../lib/app/addToTimeline";
import { deleteFromTimeline } from "../lib/app/deleteFromTimeline";

function App(): JSX.Element {
	const [timelineContentList, setTimelineContentList] = useState<Content[]>([
		{ id: uuidv4(), name: "Timeline Content 1" },
		{ id: uuidv4(), name: "Timeline Content 2" },
		{ id: uuidv4(), name: "Timeline Content 3" },
		{ id: uuidv4(), name: "Timeline Content 4" },
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
	const [currentDragCard, setCurrentDragCard] = useState< Active | null>(null);
	function handleDragStart(e: DragStartEvent) {
		setCurrentDragCard(e.active);
	}
	function handleDragEnd(e: DragEndEvent) {
		const { active, over } = e;
		setCurrentDragCard(null);
		if (over) {
			/* dragging item from pallete */
			if (active.data.current?.container === "pallete") {
				if (over.data.current?.container === "pallete" || over.id === "pallete") {
					setModuleList((moduleList) => {
						const oldIndex = moduleList.findIndex((module) => module.id === active.id);
						const newIndex = moduleList.findIndex((module) => module.id === over.id);
						return arrayMove(moduleList, oldIndex, newIndex);
					});
				} else if (over && over.data.current?.container === "contentArea" || over.id === "contentArea") {
					createContent(active.data.current?.name);
				}
			}
			/* dragging item from timeline */
			if (active.data.current?.container === "timeline") {
				if (over.data.current?.container === "timeline" || over.id === "timeline") {
					setTimelineContentList((timelineContentList) => {
						const oldIndex = timelineContentList.findIndex(
							(timelineContent) => timelineContent.id === active.id
						);
						const newIndex = timelineContentList.findIndex(
							(timelineContent) => timelineContent.id === over.id
						);
						return arrayMove(timelineContentList, oldIndex, newIndex);
					});
				} else if (over.data.current?.container === "contentArea" || over.id === "contentArea") {
					deleteFromTimeline(active.data.current?.name);
				}
			}
		}
	}
	function handleDragOver(event: DragOverEvent) {
		const { over } = event;
		if (over) {
			console.log(over.data.current?.container);
			console.log(over.id);
		}
	}
	function handleDragOverlay() {
		let activeCard = moduleList.find((content) => content.id === currentDragCard?.id);
		if (!activeCard) {
			activeCard = timelineContentList.find((timelineContent) => timelineContent.id === currentDragCard?.id);
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
		<div className="grid grid-cols-2 grid-rows-[75vh_25vh] h-screen bg-variable-collection-bg-grey">
			<DndContext
				id={"unique-dnd-context-id-to-fix-nextjs-hydration-error"}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragOver={handleDragOver}
			>
				<Pallette
					moduleList={moduleList}
					currentDragCard={currentDragCard}
					className="w-full h-full"
				/>
				<ContentArea currentDragCard={currentDragCard} ></ContentArea>
				<Timeline
					timelineContentList={timelineContentList}
					currentDragCard={currentDragCard}
					className="col-span-2 !self-stretch !w-full"
				/>
				<DragOverlay>{handleDragOverlay()}</DragOverlay>
			</DndContext>
		</div>
	);
}

export default App;
