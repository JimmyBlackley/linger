import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/app/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id, text, quizId, media }: { id?: string; text: string; quizId: string, media: string } = req.body;
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
            media,
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
            media,
          },
        });
        res.status(201).json(newQuestion);
      }
    } catch (error) {
      console.error("Error creating or updating question:", error);
      res.status(500).json({ error: "Error creating or updating question" });
    }
  } else if (req.method === "GET") {
    // logic for GET requests

    const { quizId, questionId }: { quizId?: string, questionId?: string } = req.query;
    // if questionId is provided, return the question with that id
    if (questionId) {
      try {
        const question = await prisma.question.findUnique({
          where: { id: questionId },
        });
        res.status(200).json(question);
      } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ error: "Error fetching question" });
      }
      return;
    }
    // if quizId is provided, return all questions for that quiz
    else if (quizId) {
      try {
        const questions = await prisma.question.findMany({
          where: quizId ? { quizId: quizId } : {},
        });
        res.status(200).json(questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Error fetching questions" });
      }
    // if no query parameters are provided, return all questions
    // too many questions exist just to dump them all back
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }

}