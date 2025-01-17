import { Active, useDroppable } from "@dnd-kit/core";

interface Props {
	children?: React.ReactNode;
	currentDragCard: Active | null;
}

export function ContentArea({ children, currentDragCard }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "contentArea" });
	return (
		<div ref={setNodeRef} className="relative">
		</div>
	);
}
