import { prisma } from './db';

export async function getCmsData() {
  try {
    const heroStoryFrames = await prisma.heroSlide.findMany();
    const aboutDataDb = await prisma.aboutData.findFirst();
    const programsData = await prisma.program.findMany();
    const certificationsData = await prisma.certification.findMany();
    const testimonialsData = await prisma.testimonial.findMany();
    const postsData = await prisma.post.findMany();
    const categoriesData = await prisma.category.findMany();
    const footerData = await prisma.footerData.findFirst();
    const heroFeaturesData = await prisma.heroFeature.findMany();
    const partnersData = await prisma.partner.findMany();

    const aboutData = aboutDataDb ? {
      ...aboutDataDb,
      mission: JSON.parse(aboutDataDb.mission),
      stats: JSON.parse(aboutDataDb.stats)
    } : null;

    return {
      heroStoryFrames,
      aboutData,
      programsData,
      certificationsData,
      testimonialsData,
      postsData,
      categoriesData,
      footerData,
      heroFeaturesData,
      partnersData
    };
  } catch (error) {
    console.error('Failed to read from Database', error);
    return null;
  }
}

export async function saveCmsData(data: any) {
  try {
    // Dalam pendekatan ini, kita meniru perilaku file JSON (timpa semua data)
    // Untuk performa lebih baik di masa depan, sebaiknya buat API per entitas.
    
    // 1. Kategori
    if (data.categoriesData) {
      await prisma.category.deleteMany();
      for (const cat of data.categoriesData) {
        await prisma.category.create({ data: { id: cat.id, name: cat.name, type: cat.type || 'KURSUS' } as any });
      }
    }

    // 2. Program
    if (data.programsData) {
      await prisma.program.deleteMany();
      for (const prog of data.programsData) {
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
        });
      }
    }

    // 3. Sertifikasi
    if (data.certificationsData) {
      await prisma.certification.deleteMany();
      for (const cert of data.certificationsData) {
        await prisma.certification.create({
          data: {
            id: cert.id,
            title: cert.title,
            short_description: cert.short_description,
            image: cert.image,
            issuing_body: cert.issuing_body,
            price: cert.price
          }
        });
      }
    }

    // 4. Testimoni
    if (data.testimonialsData) {
      await prisma.testimonial.deleteMany();
      for (const testi of data.testimonialsData) {
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
        });
      }
    }

    // 5. Artikel & Berita
    if (data.postsData) {
      await prisma.post.deleteMany();
      for (const post of data.postsData) {
        let parsedDate = null;
        if (post.published_at) {
          const d = new Date(post.published_at);
          if (!isNaN(d.getTime())) {
            parsedDate = d;
          }
        }
        await prisma.post.create({
          data: {
            id: post.id,
            title: post.title,
            short_description: post.short_description,
            image: post.image,
            published_at: parsedDate || new Date(),
            type: post.type || 'BERITA'
          }
        });
      }
    }

    // 6. Tentang Kami
    if (data.aboutData) {
      await prisma.aboutData.deleteMany();
      await prisma.aboutData.create({
        data: {
          id: 1,
          title: data.aboutData.title,
          description: data.aboutData.description,
          image: data.aboutData.image,
          vision: data.aboutData.vision,
          mission: JSON.stringify(data.aboutData.mission),
          stats: JSON.stringify(data.aboutData.stats),
          org_structure_image: data.aboutData.org_structure_image,
          logo_philosophy: data.aboutData.logo_philosophy,
          logo_usage: data.aboutData.logo_usage
        } as any
      });
    }

    // 7. Hero Slide
    if (data.heroStoryFrames && data.heroStoryFrames.length > 0) {
      await prisma.heroSlide.deleteMany();
      const frame = data.heroStoryFrames[0];
      await prisma.heroSlide.create({
        data: {
          title: frame.title,
          subtitle: frame.subtitle,
          tagline: frame.tagline,
          image: frame.image,
          type: frame.type || 'image'
        }
      });
    }

    // 8. Footer Data
    if (data.footerData) {
      await prisma.footerData.deleteMany();
      await prisma.footerData.create({
        data: {
          id: 1,
          description: data.footerData.description,
          address: data.footerData.address,
          email: data.footerData.email,
          phone: data.footerData.phone
        }
      });
    }

    // 9. Hero Features
    if (data.heroFeaturesData) {
      await prisma.heroFeature.deleteMany();
      for (const feature of data.heroFeaturesData) {
        await prisma.heroFeature.create({
          data: {
            title: feature.title,
            icon: feature.icon,
            link: feature.link
          }
        });
      }
    }

    // 10. Mitra & Teknologi (Partners)
    if (data.partnersData) {
      await prisma.partner.deleteMany();
      for (const partner of data.partnersData) {
        await prisma.partner.create({
          data: {
            id: partner.id,
            name: partner.name,
            description: partner.description,
            icon: partner.icon || null,
            logo: partner.logo || null,
            color: partner.color || null,
            row: partner.row
          }
        });
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to write to Database', error);
    return false;
  }
}
