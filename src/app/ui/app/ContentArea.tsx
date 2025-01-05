import { SortableCard } from "./SortableCard";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Content } from "@/app/types";

interface Props {
	children?: React.ReactNode;
	contentList: Content[];
	activeId: UniqueIdentifier | null;
}

function ContentArea({ children, contentList, activeId }: Props): JSX.Element {
	const { setNodeRef } = useDroppable({ id: "contentArea" });
	return (
		<div ref={setNodeRef}>
			<SortableContext items={contentList}>
				<div className="grid grid-cols-3 auto-rows-min gap-3 p-3 overflow-y-auto">
					{contentList.map((content) => {
						return (
							<SortableCard
								key={content.id}
								id={content.id}
								container="contentArea"
								name={content.name}
								className={`w-full ${activeId === content.id ? "invisible" : ""}`}
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
