import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/app/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quizzes' });
  }
}