'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function EventsList({ eventsData }: { eventsData: any[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(eventsData.map(e => e.location_type)))];
  const filteredData = activeFilter === 'All' ? eventsData : eventsData.filter(e => e.location_type === activeFilter);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-12 border-b border-gray-100 pb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === cat 
                ? 'bg-black text-white' 
                : 'bg-[#FAFAFA] text-gray-500 hover:bg-gray-100 hover:text-black border border-black/[0.04]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredData.map(event => (
          <Link key={event.id} href={`/events/${event.id}`} className="group cursor-pointer block">
            <div className="relative overflow-hidden rounded-3xl mb-8 aspect-[16/10] md:aspect-video bg-gray-100">
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
        {filteredData.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500">Tidak ada acara untuk kategori ini.</div>
        )}
      </div>
    </>
  );
}
