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

  const quiz = await prisma.quiz.create({
    data: {
      title: 'General Knowledge Quiz',
      description: 'A simple quiz to test your knowledge.',
      creatorId: user.id,
    },
  });

  const question = await prisma.question.create({
    data: {
      text: 'What is the capital of Australia?',
      quizId: quiz.id,
    },
  });

  await prisma.answer.createMany({
    data: [
      { text: 'Sydney', questionId: question.id },
      { text: 'Melbourne', questionId: question.id },
      { text: 'Canberra', questionId: question.id },
      { text: 'Perth', questionId: question.id },
    ],
  });

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
