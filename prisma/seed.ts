import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Clean existing data (opsional, tapi berguna untuk reset)
  await prisma.partner.deleteMany();
  await prisma.heroFeature.deleteMany();
  await prisma.heroSlide.deleteMany();
  await prisma.post.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.program.deleteMany();
  await prisma.category.deleteMany();
  await prisma.aboutData.deleteMany();
  await prisma.footerData.deleteMany();

  // 2. Seed Categories
  const categories = [
    { id: 'cat-1', name: 'Web Development', type: 'KURSUS' },
    { id: 'cat-2', name: 'Data Science', type: 'KURSUS' },
    { id: 'cat-3', name: 'Mobile Apps', type: 'KURSUS' },
    { id: 'cat-4', name: 'Digital Marketing', type: 'PELATIHAN_KERJA' },
    { id: 'cat-5', name: 'Cyber Security', type: 'PELATIHAN_KERJA' }
  ];
  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }

  // 3. Seed Programs
  const programs = [
    {
      id: 'prog-1',
      title: 'Fullstack Web Developer',
      short_description: 'Belajar membuat website dari nol hingga mahir menggunakan MERN stack.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
      duration: '3 Bulan',
      price: 2500000,
      discount_price: 1500000,
      badge: 'Terpopuler',
      category: 'Web Development',
      level: 'Beginner to Advanced',
      type: 'KURSUS'
    },
    {
      id: 'prog-2',
      title: 'Data Science with Python',
      short_description: 'Kuasai analisis data, machine learning, dan visualisasi dengan Python.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
      duration: '4 Bulan',
      price: 3000000,
      discount_price: 2000000,
      badge: 'Banyak Dicari',
      category: 'Data Science',
      level: 'Intermediate',
      type: 'KURSUS'
    },
    {
      id: 'prog-3',
      title: 'Digital Marketing Bootcamp',
      short_description: 'Pelajari SEO, SEM, dan Social Media Ads untuk tingkatkan karirmu.',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80',
      duration: '2 Bulan',
      price: 1500000,
      discount_price: null,
      badge: '',
      category: 'Digital Marketing',
      level: 'Beginner',
      type: 'PELATIHAN_KERJA'
    }
  ];
  for (const prog of programs) {
    await prisma.program.create({ data: prog });
  }

  // 4. Seed Certifications
  const certifications = [
    {
      id: 'cert-1',
      title: 'Sertifikasi BNSP Junior Web Developer',
      short_description: 'Dapatkan pengakuan negara atas kompetensi web development-mu.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
      issuing_body: 'BNSP RI',
      price: 500000
    },
    {
      id: 'cert-2',
      title: 'Sertifikasi BNSP Digital Marketing',
      short_description: 'Validasi kemampuan digital marketing dengan standar industri.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
      issuing_body: 'BNSP RI',
      price: 450000
    }
  ];
  for (const cert of certifications) {
    await prisma.certification.create({ data: cert });
  }

  // 5. Seed Testimonials
  const testimonials = [
    {
      id: 'testi-1',
      name: 'Budi Santoso',
      photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150',
      program: 'Fullstack Web Developer',
      testimonial: 'Materi sangat daging dan mentornya ramah. Setelah lulus saya langsung diterima kerja!',
      rating: 5,
      job_title: 'Junior Frontend Developer',
      company: 'PT Teknologi Inovasi'
    },
    {
      id: 'testi-2',
      name: 'Siti Aminah',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
      program: 'Digital Marketing Bootcamp',
      testimonial: 'Praktek langsung bikin cepat ngerti. Modulnya juga up to date banget.',
      rating: 5,
      job_title: 'Social Media Specialist',
      company: 'Agensi Kreatif'
    }
  ];
  for (const testi of testimonials) {
    await prisma.testimonial.create({ data: testi });
  }

  // 6. Seed Posts (Berita & Artikel)
  const posts = [
    {
      id: 'post-1',
      title: 'Peluang Karir IT di Tahun 2026',
      short_description: 'Membahas tentang trend teknologi terbaru dan posisi apa saja yang sedang naik daun.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
      published_at: new Date(),
      type: 'ARTIKEL'
    },
    {
      id: 'post-2',
      title: 'Seminar Nasional AI untuk Pendidikan',
      short_description: 'Kami baru saja mengadakan seminar nasional yang dihadiri oleh ratusan peserta.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
      published_at: new Date(),
      type: 'BERITA'
    }
  ];
  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  // 7. Seed HeroSlide (Cuma 1 untuk saat ini)
  await prisma.heroSlide.create({
    data: {
      title: 'Belajar Teknologi untuk Masa Depan.',
      subtitle: 'Mulai perjalanan karir digitalmu bersama Digital Kompetensi Indonesia.',
      tagline: 'EKOSISTEM BELAJAR DEVELOPER SEJAK 2016',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
      type: 'image'
    }
  });

  // 8. Seed HeroFeatures
  const heroFeatures = [
    { title: 'Sertifikasi BNSP', icon: 'Award', link: '/programs' },
    { title: 'Kurikulum Update', icon: 'BookOpen', link: '/programs' },
    { title: 'Mentor Praktisi', icon: 'Users', link: '/about/profil' },
    { title: 'Proyek Realita', icon: 'Briefcase', link: '/programs' }
  ];
  for (const hf of heroFeatures) {
    await prisma.heroFeature.create({ data: hf });
  }

  // 9. Seed Partners
  const partners = [
    { id: 'p1', name: 'React.js', description: 'Interface Components', icon: 'Layout', color: 'text-blue-500', row: 'TOP' },
    { id: 'p2', name: 'Node.js', description: 'Runtime Execution', icon: 'Server', color: 'text-green-500', row: 'TOP' },
    { id: 'p3', name: 'HTML 5', description: 'Content Structure', icon: 'Globe', color: 'text-orange-500', row: 'TOP' },
    { id: 'p4', name: 'Python', description: 'Logic Automation', icon: 'Terminal', color: 'text-yellow-500', row: 'TOP' },
    { id: 'p5', name: 'Laravel', description: 'Backend Architecture', icon: 'Code', color: 'text-red-500', row: 'TOP' },
    { id: 'p6', name: 'Flutter', description: 'Mobile Development', icon: 'Smartphone', color: 'text-cyan-500', row: 'TOP' },
    { id: 'p7', name: 'MySQL', description: 'Relational Database', icon: 'Database', color: 'text-blue-600', row: 'BOTTOM' },
    { id: 'p8', name: 'CSS 3', description: 'Visual Styling', icon: 'PenTool', color: 'text-blue-400', row: 'BOTTOM' },
    { id: 'p9', name: 'AWS', description: 'Cloud Infrastructure', icon: 'Cloud', color: 'text-yellow-600', row: 'BOTTOM' },
    { id: 'p10', name: 'Cyber Security', description: 'System Protection', icon: 'Shield', color: 'text-green-600', row: 'BOTTOM' },
    { id: 'p11', name: 'AI Engineering', description: 'Machine Learning', icon: 'Cpu', color: 'text-purple-500', row: 'BOTTOM' },
    { id: 'p12', name: 'UI/UX Design', description: 'User Experience', icon: 'Monitor', color: 'text-pink-500', row: 'BOTTOM' }
  ];
  for (const pt of partners) {
    await prisma.partner.create({ data: pt });
  }

  // 10. Seed AboutData
  await prisma.aboutData.create({
    data: {
      id: 1,
      title: 'Siapa Kami?',
      description: 'Digital Kompetensi Indonesia (DKI) adalah lembaga pendidikan non-formal yang berfokus pada peningkatan kemampuan SDM di bidang teknologi digital.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
      vision: 'Menjadi pusat unggulan pendidikan teknologi dan keterampilan digital bertaraf internasional yang menghasilkan SDM kompeten, inovatif, dan berdaya saing global.',
      mission: JSON.stringify([
        "Menyelenggarakan program pendidikan vokasi dan pelatihan profesional",
        "Menjalin kemitraan strategis dengan industri",
        "Menyediakan fasilitas pembelajaran berbasis teknologi mutakhir"
      ]),
      stats: JSON.stringify([
        { label: 'Alumni Sukses', value: '5000+' },
        { label: 'Program Unggulan', value: '45+' },
        { label: 'Mitra Industri', value: '120+' }
      ])
    }
  });

  // 11. Seed FooterData
  await prisma.footerData.create({
    data: {
      id: 1,
      description: 'Lembaga Pelatihan Kerja & Sertifikasi terdepan untuk mengembangkan talenta digital yang siap bersaing di dunia industri modern.',
      address: 'Jl. Teknologi Cerdas No. 123\nJakarta Selatan, 12345\nIndonesia',
      email: 'hello@web-dki.id',
      phone: '+62 811 2222 3333'
    }
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
