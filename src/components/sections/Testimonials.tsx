'use client';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useRef } from 'react';
import FadeIn from '../ui/FadeIn';

export default function Testimonials({ data: testimonialsData = [] }: { data?: any[] }) {
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
    <section id="testimonials" className="py-32 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-3xl md:text-5xl font-semibold text-black tracking-tight">Cerita Sukses.</h2>
            <div className="flex gap-4">
              <button onClick={() => scroll('left')} className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button onClick={() => scroll('right')} className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8"
          >
            {testimonialsData.map(testi => (
              <div key={testi.id} className="w-[85vw] sm:w-[350px] lg:w-[380px] flex-shrink-0 snap-start bg-white p-8 rounded-3xl border border-black/[0.04] flex flex-col h-full cursor-pointer hover:bg-gray-50 transition-colors">
                <p className="text-lg text-black font-medium leading-relaxed tracking-tight mb-8">
                  "{testi.testimonial}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={testi.photo} alt={testi.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-black text-sm">{testi.name}</h4>
                    <p className="text-xs text-gray-500">{testi.job_title} di {testi.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
