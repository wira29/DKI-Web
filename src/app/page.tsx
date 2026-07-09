import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Programs from '@/components/sections/Programs';
import Certifications from '@/components/sections/Certifications';
import Partnerships from '@/components/sections/Partnerships';
import Testimonials from '@/components/sections/Testimonials';
import Events from '@/components/sections/Events';
import Contact from '@/components/sections/Contact';
import { Metadata } from 'next';
import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Beranda | Digital Kompetensi Indonesia',
  description: 'Selamat datang di Digital Kompetensi Indonesia, lembaga kursus dan pelatihan IT terbaik dengan sertifikasi resmi.',
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const heroFrames = await prisma.heroSlide.findMany();
  const heroFeatures = await prisma.heroFeature.findMany();
  const aboutDataDb = await prisma.aboutData.findFirst();
  const programs = await prisma.program.findMany();
  const certifications = await prisma.certification.findMany();
  const testimonials = await prisma.testimonial.findMany();
  const posts = await prisma.post.findMany({ take: 3, orderBy: { published_at: 'desc' } });
  const partners = await prisma.partner.findMany();

  // Parse JSON fields back to objects for About
  const aboutData = aboutDataDb ? {
    ...aboutDataDb,
    mission: JSON.parse(aboutDataDb.mission),
    stats: JSON.parse(aboutDataDb.stats)
  } : null;

  return (
    <div className="min-h-screen bg-black">
      <Hero frames={heroFrames} features={heroFeatures} />
      <div className="bg-white">
        <About data={aboutData} />
        <Programs data={programs} />
        <Certifications data={certifications} />
        <Partnerships data={partners} />
        <Testimonials data={testimonials} />
        <Events data={posts} />
        <Contact />
      </div>
    </div>
  );
}
