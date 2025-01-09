import { SortableCard } from "./SortableCard";
import { Active, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Content } from "@/app/types";

interface Props {
	children?: React.ReactNode;
	currentDragCard: Active | null;
}

function ContentArea({ children, currentDragCard }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "contentArea" });
	return (
		<div ref={setNodeRef} className="relative">
		</div>
	);
}

export default ContentArea;
