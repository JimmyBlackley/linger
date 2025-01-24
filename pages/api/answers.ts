import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/app/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { questionId, text, isCorrect }: { questionId: number; text: string; isCorrect: boolean } = req.body;

    try {
      // Fetch the question by its ID
      const question = await prisma.question.findUnique({
        where: { id: questionId },
      });

      // Check if the question exists
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      // Create a new answer
      const newAnswer = await prisma.answer.create({
        data: {
          text,
          questionId,
          isCorrect,
        },
      });

      res.status(201).json(newAnswer);
    } catch (error) {
      console.error("Error creating answer:", error);
      res.status(500).json({ error: "Error creating answer" });
    }
  } else if (req.method === "GET") {
    const { questionId }: { questionId?: number } = req.query;

    try {
      const answers = await prisma.answer.findMany({
        where: questionId ? { questionId: Number(questionId) } : {},
      });
      res.status(200).json(answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      res.status(500).json({ error: "Error fetching answers" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}