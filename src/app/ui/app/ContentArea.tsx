import { SortableCard } from "./SortableCard";
import { Active, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Content } from "@/app/types";

interface Props {
	children?: React.ReactNode;
	contentList: Content[];
	currentDragCard: Active | null;
}

function ContentArea({ children, contentList, currentDragCard }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "contentArea" });
	return (
		<div ref={setNodeRef} className="relative">
			{currentDragCard?.data.current?.container === "timeline" && (
				<div className="absolute inset-0 bg-red-500 opacity-50 pointer-events-none"></div>
			)}
			{currentDragCard?.data.current?.container === "pallete" && (
				<div className="absolute inset-0 bg-green-500 opacity-50 pointer-events-none"></div>
			)}
			<SortableContext items={contentList}>
				<div className="grid grid-cols-3 auto-rows-min gap-3 p-3 overflow-y-auto">
					{contentList.map((content) => {
						return (
							<SortableCard
								key={content.id}
								id={content.id}
								container="contentArea"
								name={content.name}
								className={`w-full ${currentDragCard?.id === content.id ? "invisible" : ""}`}
							>
								{content.name}
							</SortableCard>
						);
					})}
					{children}
				</div>
			</SortableContext>
		</div>
	);
}

export default ContentArea;
