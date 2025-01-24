import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/app/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, title, creatorId }: { id: string; title: string, creatorId: number } = req.body;
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
    try {
      const quizzes = await prisma.quiz.findMany();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching quizzes' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}