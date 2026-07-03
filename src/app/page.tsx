import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Programs from '@/components/sections/Programs';
import Certifications from '@/components/sections/Certifications';
import Testimonials from '@/components/sections/Testimonials';
import Events from '@/components/sections/Events';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const heroFrames = await prisma.heroSlide.findMany();
  const aboutDataDb = await prisma.aboutData.findFirst();
  const programs = await prisma.program.findMany();
  const certifications = await prisma.certification.findMany();
  const testimonials = await prisma.testimonial.findMany();
  const events = await prisma.event.findMany();

  // Parse JSON fields back to objects for About
  const aboutData = aboutDataDb ? {
    ...aboutDataDb,
    mission: JSON.parse(aboutDataDb.mission),
    stats: JSON.parse(aboutDataDb.stats)
  } : null;

  return (
    <div className="min-h-screen bg-black">
      <Hero frames={heroFrames} />
      <div className="bg-white">
        <About data={aboutData} />
        <Programs data={programs} />
        <Certifications data={certifications} />
        <Testimonials data={testimonials} />
        <Events data={events} />
      </div>
    </div>
  );
}
