import { prisma } from '@/lib/db';
import EventsList from '@/components/ui/EventsList';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const eventsData = await prisma.event.findMany({
    orderBy: { event_date: 'asc' }
  });

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold text-black tracking-tight mb-6 leading-tight">Artikel & Acara.</h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Temukan wawasan terbaru, inspirasi karir, dan ikuti acara interaktif yang kami selenggarakan secara reguler.
          </p>
        </div>
        <EventsList eventsData={eventsData} />
      </div>
    </div>
  );
}
