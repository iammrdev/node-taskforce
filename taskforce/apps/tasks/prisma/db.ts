require('dotenv/config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');

const getDB = async () => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const offers = await prisma.task.findMany({
    include: {
      category: true,
      comments: true,
      tags: true,
    },
  });
  console.log(JSON.stringify(offers, null, 2));
};

getDB();
