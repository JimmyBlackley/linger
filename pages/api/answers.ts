import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/app/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id, questionId, text, isCorrect }: { id?: string; questionId: string; text: string; isCorrect: boolean } = req.body;

    try {
      // Fetch the question by its ID
      const question = await prisma.question.findUnique({
        where: { id: questionId },
      });

      // Check if the question exists
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      if (id) {
        // Update existing answer
        const updatedAnswer = await prisma.answer.update({
          where: { id },
          data: {
            text,
            isCorrect,
            question: { connect: { id: questionId } }, // Connect the answer to the question
          },
        });
        res.status(200).json(updatedAnswer);
      } else {
        // Create a new answer
        const newAnswer = await prisma.answer.create({
          data: {
            text,
            isCorrect,
            question: { connect: { id: questionId } }, // Connect the answer to the question
          },
        });
        res.status(201).json(newAnswer);
      }
    } catch (error) {
      console.error("Error creating or updating answer:", error);
      res.status(500).json({ error: "Error creating or updating answer" });
    }
  } else if (req.method === "GET") {
    const { questionId }: { questionId?: string } = req.query;

    try {
      const answers = await prisma.answer.findMany({
        where: questionId ? { questionId: questionId } : {},
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