const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const footer = await prisma.footerData.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      description: 'Lembaga pelatihan dan sertifikasi kompetensi terdepan untuk talenta digital masa depan.',
      address: 'Jl. Contoh Alamat No. 123, Jakarta',
      email: 'info@dki.example.com',
      phone: '+62 812 3456 7890'
    }
  });
  console.log('Footer seeded:', footer);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
