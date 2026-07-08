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
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-4 block">Testimoni</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Cerita Sukses.</h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">Pengalaman nyata dari mereka yang telah bertransformasi dan meraih kesuksesan bersama kami.</p>
            </div>
            <div className="flex gap-4">
              <button aria-label="Sebelumnya" onClick={() => scroll('left')} className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary hover:shadow-md transition-all active:scale-95 text-gray-400">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button aria-label="Selanjutnya" onClick={() => scroll('right')} className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary hover:shadow-md transition-all active:scale-95 text-gray-400">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-12 pt-4 px-2 -mx-2"
          >
            {testimonialsData.map((testi, i) => (
              <div key={testi.id} className="group relative w-[85vw] sm:w-[350px] lg:w-[400px] flex-shrink-0 snap-center sm:snap-start bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden">
                
                {/* Ornamen: Glow Background */}
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500 pointer-events-none"></div>
                
                {/* Ikon Quote Watermark */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 group-hover:scale-110 transition-all duration-500 pointer-events-none transform rotate-12" />

                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed tracking-tight mb-8 relative z-10 group-hover:text-gray-900 transition-colors">
                  "{testi.testimonial}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto relative z-10 border-t border-gray-50 pt-6">
                  <div className="relative">
                    <img src={testi.photo} alt={testi.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-primary/30 transition-colors" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">{testi.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{testi.job_title} di <span className="font-medium text-gray-700">{testi.company}</span></p>
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
