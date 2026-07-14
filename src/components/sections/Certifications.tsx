import { ArrowUpRight, Award } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '../ui/FadeIn';

export default function Certifications({ data: certificationsData = [] }: { data?: any[] }) {
  return (
    <section id="certifications" className="py-24 bg-primary/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-4 block">Sertifikasi</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Sertifikasi Kompetensi.</h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">Validasi kemampuan Anda dengan sertifikasi yang diakui secara nasional maupun internasional.</p>
            </div>
            <Link href="/certifications" className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
              Lihat Semua
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {certificationsData.map((cert, index) => (
            <FadeIn key={cert.id} delay={index * 0.1}>
              <Link href={`/certifications/${cert.slug}`} className="group relative bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden flex flex-col h-[300px]">
                
                {/* Ornamen Background Glow */}
                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
                
                {/* Ikon Watermark */}
                <Award className="absolute -bottom-6 -right-6 w-32 h-32 text-gray-100 group-hover:scale-110 group-hover:text-primary/5 transition-all duration-700 pointer-events-none transform -rotate-12" />

                {/* Header Card: Ikon dan Badge */}
                <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500 shadow-sm border border-primary/10">
                    <Award className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full text-right mt-1 line-clamp-2">
                    {cert.issuing_body}
                  </div>
                </div>
                
                {/* Konten Utama */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight group-hover:text-primary transition-colors duration-300 leading-tight">{cert.title}</h3>
                  <p className="text-gray-500 font-light text-xs leading-relaxed line-clamp-3">{cert.short_description}</p>
                </div>

                <div className="mt-auto pt-4 flex items-center text-xs font-semibold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                  Pelajari Persyaratan <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
