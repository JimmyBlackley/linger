import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/app/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, title, description, creatorId, timeline }: { id: string; title: string; description?: string; creatorId: string; timeline: string[] } = req.body;

    try {
      // Check if a quiz with the given ID already exists
      const existingQuiz = await prisma.quiz.findUnique({
        where: { id },
      });

      if (existingQuiz) {
        // Update the existing quiz
        const updatedQuiz = await prisma.quiz.update({
          where: { id },
          data: {
            title,
            description,
            timeline,
          },
        });
        res.status(200).json(updatedQuiz);
      } else {
        // Create a new quiz
        const newQuiz = await prisma.quiz.create({
          data: {
            id,
            title,
            description,
            creatorId,
            timeline,
          },
        });
        res.status(201).json(newQuiz);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error creating or updating quiz' });
    }
  } else if (req.method === 'GET') {
    const { quizId }: { quizId?: string } = req.query;

    try {
      if (quizId) {
        const quiz = await prisma.quiz.findUnique({
          where: { id: quizId },
          include: {
            questions: true, // Include related questions
          },
        });
        if (quiz) {
          res.status(200).json(quiz);
        } else {
          res.status(404).json({ error: 'Quiz not found' });
        }
      } else {
        const quizzes = await prisma.quiz.findMany({
          include: {
            questions: true, // Include related questions
          },
        });
        res.status(200).json(quizzes);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching quizzes' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}