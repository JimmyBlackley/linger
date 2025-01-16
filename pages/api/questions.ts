import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/app/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { text, quizId }: { text: string; quizId: number } = req.body;
    const type = "MULTIPLE_CHOICE"; // Hardcoded question type

    try {
      const newQuestion = await prisma.question.create({
        data: {
          text,
          type,
          quizId,
        },
      });
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(500).json({ error: "Error creating question" });
    }
  } else if (req.method === "GET") {
    const { quizId }: { quizId?: number } = req.query;

    try {
      const questions = await prisma.question.findMany({
        where: quizId ? { quizId: Number(quizId) } : {},
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