'use client';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import FadeIn from '../ui/FadeIn';

export default function Events({ data: postsData = [] }: { data?: any[] }) {
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

  // Strip HTML tags for preview
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
  };

  return (
    <section id="events" className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-4 block">Informasi</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Artikel & Berita.</h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">Berita terkini, wawasan industri, dan artikel edukasi.</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/news" className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 hover:text-primary hover:border-primary hover:bg-primary/5 px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm group active:scale-95">
                Lihat Semua Artikel <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative group/slider">
            {/* Tombol Kiri */}
            <button 
              aria-label="Sebelumnya"
              onClick={() => scroll('left')} 
              className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-xl text-gray-700 hover:text-primary hover:border-primary transition-all opacity-0 group-hover/slider:opacity-100 active:scale-95 disabled:opacity-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider */}
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-12 pt-4 px-2 -mx-2"
            >
              {postsData.map(post => (
                <Link 
                  key={post.id} 
                  href={post.type === 'ARTIKEL' ? `/articles/${post.id}` : `/news/${post.id}`} 
                  className="group relative w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                    <img 
                      src={post.image || '/placeholder-image.jpg'} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* Overlay Gradient for better badge contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {post.type === 'ARTIKEL' ? 'Artikel' : 'Berita'}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col relative z-10 bg-white">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500 font-semibold mb-4 uppercase tracking-wider">
                      {post.published_at && (
                        <span>{new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 font-light leading-relaxed line-clamp-3 text-sm flex-1">
                      {stripHtml(post.short_description)}
                    </p>
                    
                    <div className="mt-5 pt-5 border-t border-gray-50 flex items-center justify-between text-sm font-semibold text-primary transition-all duration-300 group-hover:opacity-100">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Baca Selengkapnya</span>
                      <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Tombol Kanan */}
            <button 
              aria-label="Selanjutnya"
              onClick={() => scroll('right')} 
              className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-xl text-gray-700 hover:text-primary hover:border-primary transition-all opacity-0 group-hover/slider:opacity-100 active:scale-95 disabled:opacity-0"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
