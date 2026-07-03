import { Award, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '../ui/FadeIn';

export default function Certifications({ data: certificationsData = [] }: { data?: any[] }) {
  return (
    <section id="certifications" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-semibold text-black tracking-tight mb-6">Sertifikasi Kompetensi.</h2>
              <p className="text-lg md:text-xl text-gray-500 font-light">Validasi kemampuan Anda dengan sertifikasi yang diakui oleh industri.</p>
            </div>
            <Link href="/certifications" className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium transition-all active:scale-95 whitespace-nowrap">
              Lihat Jadwal
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((cert, index) => (
            <FadeIn key={cert.id} delay={index * 0.1}>
              <Link href={`/certifications/${cert.id}`} className="bg-[#FAFAFA] p-8 rounded-3xl border border-black/[0.04] flex flex-col justify-between h-full group cursor-pointer hover:bg-gray-50 transition-colors block">
                <div>
                  <div className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">{cert.issuing_body}</div>
                  <h3 className="text-2xl font-semibold text-black mb-3 tracking-tight">{cert.title}</h3>
                  <p className="text-gray-500 mb-8 font-light">{cert.short_description}</p>
                </div>
                <div className="flex items-center text-sm font-medium text-black">
                  Pelajari Persyaratan <span className="ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
