'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function NewsList({ 
  data, 
  typeLabel = 'Berita Terkini', 
  baseUrl = '/news',
  emptyMessage = 'Belum ada konten yang diterbitkan saat ini.'
}: { 
  data: any[],
  typeLabel?: string,
  baseUrl?: string,
  emptyMessage?: string
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        {paginatedData.map(item => (
          <Link key={item.id} href={`${baseUrl}/${item.id}`} className="group cursor-pointer block border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-video bg-gray-100 rounded-2xl overflow-hidden shrink-0 relative">
                <img 
                  src={item.image || "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop"} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-center py-2">
                <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                  </span>
                  <span>&bull;</span>
                  <span className="text-primary font-semibold">{typeLabel}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 font-light leading-relaxed line-clamp-3 mb-6">
                  {item.short_description?.replace(/<[^>]+>/g, '') || ''}
                </p>
                
                <div className="mt-auto">
                  <span className="text-sm font-semibold text-black group-hover:text-blue-600 flex items-center gap-2 transition-colors">
                    Baca Selengkapnya &rarr;
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {data.length === 0 && (
          <div className="py-20 text-center text-gray-500">{emptyMessage}</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-16 pt-8 border-t border-gray-100">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Sebelumnya
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                  currentPage === i + 1 
                    ? 'bg-black text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </>
  );
}
