import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete all existing records in the database
  await prisma.quiz.deleteMany();
  await prisma.question.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.gameSession.deleteMany();
  await prisma.player.deleteMany();

  const user = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: 'securepassword',
    },
  });

  const quizzes = await prisma.quiz.createMany({
    data: [
      { title: 'Quiz 1', description: 'Description for Quiz 1', creatorId: user.id, timeline: [] },
      { title: 'Quiz 2', description: 'Description for Quiz 2', creatorId: user.id, timeline: [] },
      { title: 'Quiz 3', description: 'Description for Quiz 3', creatorId: user.id, timeline: [] },
      { title: 'Quiz 4', description: 'Description for Quiz 4', creatorId: user.id, timeline: [] },
      { title: 'Quiz 5', description: 'Description for Quiz 5', creatorId: user.id, timeline: [] },
    ],
  });

  const quizIds = await prisma.quiz.findMany({
    where: { creatorId: user.id },
    select: { id: true, title: true },
  });

  for (const quiz of quizIds) {
    const questions = await prisma.question.createMany({
      data: [
        { text: `Question 1 for ${quiz.title}`, type: 'MULTIPLE_CHOICE', quizId: quiz.id },
        { text: `Question 2 for ${quiz.title}`, type: 'TEXT_INPUT', quizId: quiz.id },
        { text: `Question 3 for ${quiz.title}`, type: 'SLIDER', quizId: quiz.id },
        { text: `Question 4 for ${quiz.title}`, type: 'DRAG_AND_DROP', quizId: quiz.id },
      ],
    });

    const questionIds = await prisma.question.findMany({
      where: { quizId: quiz.id },
      select: { id: true },
    });

    const timeline = questionIds.map(q => q.id);
    await prisma.quiz.update({
      where: { id: quiz.id },
      data: { timeline },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });