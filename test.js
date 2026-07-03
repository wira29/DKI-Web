const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const data = await prisma.aboutData.findFirst();
  console.log("org_structure_image:", data.org_structure_image);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
