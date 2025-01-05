import React, { useState } from "react";
import { motion } from "motion/react";
import { SortableCard } from "./SortableCard";
import { DropdownButton } from "./DropdownButton";
import { Module } from "@/app/types";
import { SortableContext } from "@dnd-kit/sortable";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";

interface Props {
	className?: string;
	moduleList: Module[];
	activeId: UniqueIdentifier | null;
}
function Pallette({ className, moduleList, activeId }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "pallete" });
	const [currentActiveButtonId, setCurrentActiveButtonId] = useState("");
	return (
		<div className={`p-2 flex flex-col gap-2 ${className}`}>
			<motion.div className="flex justify-end gap-2">
				<DropdownButton
					className="w-8 h-8 text-2xl"
					currentActiveButtonId={currentActiveButtonId}
					setCurrentActiveButtonId={setCurrentActiveButtonId}
				>
					+
				</DropdownButton>
				<DropdownButton
					className="w-8 h-8 text-2xl"
					currentActiveButtonId={currentActiveButtonId}
					setCurrentActiveButtonId={setCurrentActiveButtonId}
				>
					+
				</DropdownButton>
			</motion.div>
			<div ref={setNodeRef} className="flex flex-col items-center gap-4 px-0 py-[15px] h-full w-full bg-gray-300 rounded-[14px] overflow-y-auto shadow-[inset_0px_4px_4px_#00000040]">
				<SortableContext items={moduleList}>
					{moduleList.map((module) => {
						return (
							<SortableCard
								key={module.id}
								className={`flex-shrink-0 ${activeId === module.id ? "invisible" : ""}`}
								container="pallete"
								name={module.name}
								id={module.id}
							>
								{module.name}
							</SortableCard>
						);
					})}
				</SortableContext>
			</div>
		</div>
	);
}
export default Pallette;
