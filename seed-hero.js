const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.heroFeature.count();
  if (existing === 0) {
    await prisma.heroFeature.createMany({
      data: [
        { title: 'Lembaga Kursus', icon: 'BookOpen', link: '/programs' },
        { title: 'Lembaga Pelatihan Kerja', icon: 'Briefcase', link: '/programs' },
        { title: 'Sertifikasi BNSP', icon: 'Award', link: '/certifications' },
        { title: 'Event', icon: 'CalendarDays', link: '/events' },
      ]
    });
    console.log('HeroFeature seeded');
  } else {
    console.log('HeroFeature already seeded');
  }

  // Update HeroSlide tagline if null
  await prisma.heroSlide.updateMany({
    where: { tagline: null },
    data: { tagline: 'EKOSISTEM BELAJAR DEVELOPER SEJAK 2016' }
  });
  console.log('HeroSlide tagline updated');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
