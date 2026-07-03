'use client';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import FadeIn from '../ui/FadeIn';

export default function Events({ data: eventsData = [] }: { data?: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="events" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <h2 className="text-3xl md:text-5xl font-semibold text-black tracking-tight">Artikel & Acara.</h2>
            <div className="flex items-center gap-6">
              <Link href="/events" className="text-black font-medium hover:opacity-70 transition-opacity flex items-center gap-2 text-sm mr-4">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex gap-4">
                <button onClick={() => scroll('left')} className="p-3 rounded-full bg-[#FAFAFA] border border-gray-200 hover:bg-gray-100 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                <button onClick={() => scroll('right')} className="p-3 rounded-full bg-[#FAFAFA] border border-gray-200 hover:bg-gray-100 transition-colors">
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div 
            ref={scrollRef}
            className="flex gap-10 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8"
          >
            {eventsData.map(event => (
              <Link key={event.id} href={`/events/${event.id}`} className="w-[85vw] sm:w-[450px] lg:w-[570px] flex-shrink-0 snap-start group cursor-pointer block">
                <div className="relative overflow-hidden rounded-3xl mb-8 aspect-video bg-gray-100">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400 font-medium mb-4 uppercase tracking-wider">
                  <span>{new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</span>
                  <span>&bull;</span>
                  <span>{event.location_type}</span>
                </div>
                <h3 className="text-3xl font-semibold text-black mb-4 tracking-tight group-hover:opacity-70 transition-opacity">{event.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{event.short_description}</p>
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
