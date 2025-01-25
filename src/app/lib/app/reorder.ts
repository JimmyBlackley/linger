import { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Question } from "@prisma/client";

export function reorder(
	setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
	active: Active,
	over: Over
) {
	setQuestions((questions) => {
		const oldIndex = questions.findIndex((question) => question.id === active.id);
		const newIndex = questions.findIndex((question) => question.id === over.id);
		console.log("oldIndex: ", oldIndex);
		console.log("newIndex: ", newIndex);
		return arrayMove(questions, oldIndex, newIndex);
	});
}
