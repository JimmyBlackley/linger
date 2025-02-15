import { Active, useDroppable } from "@dnd-kit/core";

interface Props {
	children?: React.ReactNode;
	currentDragCard: Active | null;
}

export function PreviewArea({ children, currentDragCard }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "contentArea" });
	return (
		<div ref={setNodeRef} className="relative">
			<PreviewImage currentDragCard={currentDragCard}>{children}</PreviewImage>
			<PreviewText currentDragCard={currentDragCard} />
		</div>
	);
}


export function PreviewText({ children }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "contentArea" });
	return (
		<div ref={setNodeRef} className="relative">
			{children}
			<h1>Text</h1>
		</div>
	);
}

export function PreviewImage({ children }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "contentArea" });
	return (
		<div ref={setNodeRef} className="relative">
			{children}
			<h1>Image</h1>
		</div>
	);
}