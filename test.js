
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const referral = await prisma.referral.create({
    data: {
      referrerName: 'Test Referrer',
      referrerEmail: 'referrer@test.com',
      refereeName: 'Test Referee',
      refereeEmail: 'referee@test.com',
    },
  });
  console.log(referral);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
