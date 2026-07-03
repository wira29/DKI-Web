'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function ProgramsListContent({ programsData, categoriesData }: { programsData: any[], categoriesData: any[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeFilter, setActiveFilter] = useState<string>(categoryParam || 'All');

  useEffect(() => {
    if (categoryParam) {
      setActiveFilter(categoryParam);
    } else {
      setActiveFilter('All');
    }
  }, [categoryParam]);

  // Ambil nama kategori dari database, bukan dari data program
  const dbCategories = categoriesData ? categoriesData.map((c: any) => c.name) : [];
  // Gabungkan jika ada kategori di program yang belum ada di database (opsional), tapi lebih baik fokus ke DB
  const categories = ['All', ...Array.from(new Set([...dbCategories, ...programsData.map(p => p.category)]))];
  
  const filteredData = activeFilter === 'All' ? programsData : programsData.filter(p => p.category === activeFilter);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-12 border-b border-black/[0.04] pb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === cat 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-black border border-black/[0.04]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map(prog => (
          <Link key={prog.id} href={`/programs/${prog.id}`} className="bg-white rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300 border border-black/[0.04] group flex flex-col h-full cursor-pointer block">
            <div className="flex justify-between items-start mb-12">
              <span className="text-xs font-semibold tracking-wider uppercase text-gray-400">{prog.category}</span>
              <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-2xl font-semibold text-black mb-3 tracking-tight">{prog.title}</h3>
            <p className="text-gray-500 mb-8 font-light line-clamp-3">{prog.short_description}</p>
            <div className="mt-auto pt-6 flex items-center justify-between border-t border-black/[0.04]">
              <span className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">{prog.level}</span>
              <span className="text-sm font-medium text-gray-400">{prog.duration}</span>
            </div>
          </Link>
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500">Tidak ada program untuk kategori ini.</div>
        )}
      </div>
    </>
  );
}

export default function ProgramsList({ programsData, categoriesData = [] }: { programsData: any[], categoriesData?: any[] }) {
  return (
    <Suspense fallback={<div className="h-96 flex items-center justify-center text-gray-500">Memuat program...</div>}>
      <ProgramsListContent programsData={programsData} categoriesData={categoriesData} />
    </Suspense>
  );
}
