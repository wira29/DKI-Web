'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CertificationsList({ certificationsData }: { certificationsData: any[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(certificationsData.map(c => c.issuing_body)))];
  const filteredData = activeFilter === 'All' ? certificationsData : certificationsData.filter(c => c.issuing_body === activeFilter);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map(cert => (
          <Link key={cert.id} href={`/certifications/${cert.id}`} className="bg-[#FAFAFA] p-8 rounded-3xl border border-black/[0.04] flex flex-col justify-between h-full group cursor-pointer hover:bg-gray-50 transition-all hover:-translate-y-1 block">
            <div>
              <div className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">{cert.issuing_body}</div>
              <h3 className="text-2xl font-semibold text-black mb-3 tracking-tight">{cert.title}</h3>
              <p className="text-gray-500 mb-8 font-light line-clamp-3">{cert.short_description}</p>
            </div>
            <div className="border-t border-black/[0.04] pt-6 flex items-center justify-between mt-auto">
              <span className="font-semibold text-black">Rp {cert.price.toLocaleString('id-ID')}</span>
              <span className="text-sm font-medium text-black flex items-center">Detail <span className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span></span>
            </div>
          </Link>
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500">Tidak ada jadwal sertifikasi untuk kategori ini.</div>
        )}
      </div>
    </>
  );
}
