import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/app/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id, text, quizId }: { id?: string; text: string; quizId: string } = req.body;
    const type = "MULTIPLE_CHOICE"; // Hardcoded question type

    try {
      if (id) {
        // Update existing question
        const updatedQuestion = await prisma.question.update({
          where: { id },
          data: {
            text,
            type,
            quiz: { connect: { id: quizId } }, // Connect the question to the quiz
          },
        });
        res.status(200).json(updatedQuestion);
      } else {
        // Create new question
        const newQuestion = await prisma.question.create({
          data: {
            text,
            type,
            quiz: { connect: { id: quizId } }, // Connect the question to the quiz
          },
        });
        res.status(201).json(newQuestion);
      }
    } catch (error) {
      console.error("Error creating or updating question:", error);
      res.status(500).json({ error: "Error creating or updating question" });
    }
  } else if (req.method === "GET") {
    const { quizId }: { quizId?: string } = req.query;

    try {
      const questions = await prisma.question.findMany({
        where: quizId ? { quizId: quizId } : {},
      });
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ error: "Error fetching questions" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}