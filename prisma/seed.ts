import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Mulai migrasi data dari data.json ke Database...');
  
  const dataPath = path.join(process.cwd(), 'src/lib/data.json')
  const rawData = fs.readFileSync(dataPath, 'utf8')
  const json = JSON.parse(rawData)

  // Hapus data lama agar tidak duplikat saat seeding ulang
  await prisma.heroSlide.deleteMany();
  await prisma.aboutData.deleteMany();
  await prisma.event.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.program.deleteMany();
  await prisma.category.deleteMany();
  await prisma.footerData.deleteMany();

  // 1. Kategori
  for (const cat of json.categoriesData) {
    await prisma.category.create({ data: { id: cat.id, name: cat.name, type: cat.type || 'KURSUS' } as any })
  }
  console.log(`Berhasil migrasi ${json.categoriesData.length} Kategori.`);

  // 2. Program
  for (const prog of json.programsData) {
    await prisma.program.create({
      data: {
        id: prog.id,
        title: prog.title,
        short_description: prog.short_description,
        image: prog.image,
        duration: prog.duration,
        price: prog.price,
        discount_price: prog.discount_price,
        badge: prog.badge,
        category: prog.category,
        level: prog.level,
        type: prog.type || 'KURSUS'
      } as any
    })
  }
  console.log(`Berhasil migrasi ${json.programsData.length} Program Pelatihan.`);
  
  // 3. Sertifikasi
  for (const cert of json.certificationsData) {
    await prisma.certification.create({
      data: {
        id: cert.id,
        title: cert.title,
        short_description: cert.short_description,
        image: cert.image,
        issuing_body: cert.issuing_body,
        price: cert.price
      }
    })
  }
  console.log(`Berhasil migrasi ${json.certificationsData.length} Sertifikasi.`);

  // 4. Testimoni
  for (const testi of json.testimonialsData) {
    await prisma.testimonial.create({
      data: {
        id: testi.id,
        name: testi.name,
        photo: testi.photo,
        program: testi.program,
        testimonial: testi.testimonial,
        rating: testi.rating,
        job_title: testi.job_title,
        company: testi.company
      }
    })
  }
  console.log(`Berhasil migrasi ${json.testimonialsData.length} Testimoni.`);

  // 5. Acara & Berita
  for (const ev of json.eventsData) {
    await prisma.event.create({
      data: {
        id: ev.id,
        title: ev.title,
        short_description: ev.short_description,
        image: ev.image,
        event_date: new Date(ev.event_date),
        location_type: ev.location_type,
        status: ev.status
      }
    })
  }
  console.log(`Berhasil migrasi ${json.eventsData.length} Acara.`);

  // 6. Tentang Kami (About)
  await prisma.aboutData.create({
    data: {
      id: 1,
      title: json.aboutData.title,
      description: json.aboutData.description,
      image: json.aboutData.image,
      vision: json.aboutData.vision,
      mission: JSON.stringify(json.aboutData.mission),
      stats: JSON.stringify(json.aboutData.stats),
      org_structure_image: json.aboutData.org_structure_image || null,
      logo_philosophy: json.aboutData.logo_philosophy || null,
      logo_usage: json.aboutData.logo_usage || null
    } as any
  })
  console.log(`Berhasil migrasi Profil Lembaga (About).`);

  // 7. Hero Slide
  for (const frame of json.heroStoryFrames) {
    await prisma.heroSlide.create({
      data: {
        title: frame.title,
        subtitle: frame.subtitle,
        image: frame.image,
        type: frame.type
      }
    })
  }
  console.log(`Berhasil migrasi ${json.heroStoryFrames.length} Slide Beranda.`);
  
  // 8. Footer Data
  await prisma.footerData.create({
    data: {
      id: 1,
      description: 'Lembaga pelatihan dan sertifikasi kompetensi terdepan untuk talenta digital masa depan.',
      address: 'Jl. Contoh Alamat No. 123, Jakarta',
      email: 'info@dki.example.com',
      phone: '+62 812 3456 7890'
    }
  });
  console.log(`Berhasil migrasi Footer Data.`);

  console.log('✅ SEMUA DATA BERHASIL DIMIGRASIKAN KE DATABASE!');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
