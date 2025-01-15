import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/app/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { text, }: { text: string; type: string, } = req.body;
		try {
			const newQuestion = await prisma.question.create({
				data: {
					title,
					creatorId,
				},
			});
			res.status(201).json(newQuiz)
		} catch (error) {
			res.status(500).json({ error: "Error creating quiz" });
		}
	} else if (req.method === "GET") {
		try {
			const questions = await prisma.question.findMany({
				where: {
					id: 1,
				},
			});
			res.status(200).json(questions);
		} catch (error) {
			res.status(500).json({ error: "Error fetching quizzes" });
		}
	} else {
		res.setHeader("Allow", ["GET", "POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
