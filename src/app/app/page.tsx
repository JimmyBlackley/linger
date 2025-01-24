"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Active, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { Palette } from "@/app/ui/app/Palette";
import { Timeline } from "@/app/ui/app/Timeline";
import { ContentArea } from "@/app/ui/app/ContentArea";
import { Question } from "../types";
import { DragOverlayCard } from "../ui/app/DragOverlayCard";
import { deleteFromTimeline } from "../lib/app/deleteFromTimeline";
import reorder from "../lib/app/reorder";
import { addToTimeline } from "../lib/app/addToTimeline";

function App(): JSX.Element {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [error, setError] = useState<string | null>(null);
	const searchParams = useSearchParams();
	const quizSearch = searchParams?.get("quiz");

	useEffect(() => {
		async function fetchQuestions() {
			try {
				const response = await fetch(`/api/questions?quizId=${quizSearch || "9"}`);
				if (!response.ok) {
					throw new Error(`Error ${response.statusText}`);
				}
				const data = await response.json();
				setQuestions(data);
			} catch (error) {
				console.error("Failed to fetch questions:", error);
				setError("Failed to fetch questions. Please try again later.");
			}
		}

		fetchQuestions();
	}, [quizSearch]);

	const [timelineContentList, setTimelineContentList] = useState<Question[]>([
		{ id: uuidv4(), text: "Timeline Content 1" },
		{ id: uuidv4(), text: "Timeline Content 2" },
		{ id: uuidv4(), text: "Timeline Content 3" },
		{ id: uuidv4(), text: "Timeline Content 4" },
	]);

	const [currentDragCard, setCurrentDragCard] = useState<Active | null>(null);

	function handleDragStart(e: DragStartEvent) {
		setCurrentDragCard(e.active);
	}

	function handleDragEnd(e: DragEndEvent) {
		const { active, over } = e;
		setCurrentDragCard(null);
		if (over) {
			/* dragging item from palette */
			if (active.data.current?.container === "palette") {
				if (over.data.current?.container === "palette" || over.id === "palette") {
					reorder(setQuestions, active, over);
				} else if ((over && over.data.current?.container === "timeline") || over.id === "timeline") {
					addToTimeline(active.data.current?.name);
				}
			}
			/* dragging item from timeline */
			if (active.data.current?.container === "timeline") {
				if (over.data.current?.container === "timeline" || over.id === "timeline") {
					reorder(setTimelineContentList, active, over);
				} else if (over.data.current?.container === "palette" || over.id === "palette") {
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
		let activeCard = questions.find((content) => content.id === currentDragCard?.id);
		if (!activeCard) {
			activeCard = timelineContentList.find((timelineContent) => timelineContent.id === currentDragCard?.id);
		}
		if (activeCard) {
			return (
				<DragOverlayCard key={activeCard.id} className={`w-full`}>
					{activeCard.text}
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
				<Palette questions={questions} currentDragCard={currentDragCard} className="w-full h-full" />
				<ContentArea currentDragCard={currentDragCard}></ContentArea>
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
