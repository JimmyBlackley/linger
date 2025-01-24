import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/app/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, title, creatorId }: { id: string; title: string; creatorId: number } = req.body;
    try {
      const newQuiz = await prisma.quiz.create({
        data: {
          title,
          creatorId,
        },
      });
      res.status(201).json(newQuiz);
    } catch (error) {
      res.status(500).json({ error: 'Error creating quiz' });
    }
  } else if (req.method === 'GET') {
    const { quizId }: { quizId?: string } = req.query;

    try {
      if (quizId) {
        const quiz = await prisma.quiz.findUnique({
          where: { id: Number(quizId) },
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