'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';

export default function CertificationsList({ certificationsData }: { certificationsData: any[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);
  const categories = ['All', ...Array.from(new Set(certificationsData.map(c => c.issuing_body)))];
  const filteredData = activeFilter === 'All' ? certificationsData : certificationsData.filter(c => c.issuing_body === activeFilter);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-1/4 shrink-0">
        <div className="bg-white rounded-3xl p-6 border border-black/[0.04] sticky top-24">
          <h3 className="text-lg font-semibold text-black mb-4">Lembaga</h3>
          <div className="flex flex-col gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeFilter === cat 
                    ? 'bg-primary text-white' 
                    : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Certification Grid */}
      <div className="w-full lg:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedData.map((cert, index) => (
            <FadeIn key={cert.id} delay={index * 0.1}>
              <Link href={`/certifications/${cert.slug}`} className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 flex flex-col h-[300px] md:h-[350px]">
                {/* Background Image */}
                <Image 
                  src={cert.image || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80"}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Primary Color Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary from-15% via-primary/60 via-45% to-transparent to-75% group-hover:from-primary/95 group-hover:via-primary/80 group-hover:to-transparent transition-colors duration-500"></div>

                {/* Content */}
                <div className="relative z-10 p-5 flex flex-col h-full text-white">
                  <div className="flex justify-between items-start mb-auto">
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-white text-primary px-2.5 py-1 rounded-full shadow-sm">
                      {cert.issuing_body}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white transition-colors duration-300 border border-white/30 group-hover:border-transparent">
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2 drop-shadow-md group-hover:text-white/90 transition-colors duration-300 leading-tight">{cert.title}</h3>
                    <p className="text-white/90 mb-4 font-light line-clamp-2 text-xs leading-relaxed drop-shadow-sm">{cert.short_description}</p>
                    
                    <div className="pt-4 flex items-center justify-between border-t border-white/30">
                      <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                        Rp {cert.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
          {filteredData.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500">Tidak ada jadwal sertifikasi untuk kategori ini.</div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 text-gray-600 bg-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
