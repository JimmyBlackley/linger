import { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Question } from "@/app/types";

export function reorder(
	setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
	active: Active,
	over: Over
) {
	setQuestions((questions) => {
		const oldIndex = questions.findIndex((question) => question.id === active.id);
		const newIndex = questions.findIndex((question) => question.id === over.id);
		return arrayMove(questions, oldIndex, newIndex);
	});
}
