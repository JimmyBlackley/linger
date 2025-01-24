import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
	className?: string;
	children?: React.ReactNode;
	id: string;
	container: "contentArea" | "palette" | "timeline";
	text: string;
}

export function SortableCard({ className, children, id, container, text }: Props): JSX.Element {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: id,
		data: { container: container, text: text },
	});
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`flex w-[90%] h-[100px] items-center p-4 bg-[#FFF3B0] rounded-[20px] gap-1 select-none ${className}`}
		>
			<div className="w-20 h-20 bg-[#E6DAFF]" />
			<p className="text-black text-lg flex-1 text-center">{children}</p>
		</div>
	);
}