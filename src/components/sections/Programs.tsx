import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '../ui/FadeIn';

export default function Programs({ data: programsData = [] }: { data?: any[] }) {
  return (
    <section id="programs" className="py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-semibold text-black tracking-tight mb-6">Program Pelatihan.</h2>
              <p className="text-lg md:text-xl text-gray-500 font-light">Pilih program yang sesuai dengan passion Anda dan mulailah membangun karir di industri teknologi.</p>
            </div>
            <Link href="/programs" className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium transition-all active:scale-95 whitespace-nowrap">
              Lihat Semua Program
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programsData.map((prog, index) => (
            <FadeIn key={prog.id} delay={index * 0.1}>
              <Link href={`/programs/${prog.id}`} className="bg-white rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300 border border-black/[0.04] group flex flex-col h-full cursor-pointer block">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-400">
                    {prog.category}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-2xl font-semibold text-black mb-3 tracking-tight">{prog.title}</h3>
                <p className="text-gray-500 mb-8 font-light line-clamp-3">{prog.short_description}</p>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-black/[0.04]">
                  <span className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1 rounded-full">{prog.level}</span>
                  <span className="text-sm font-medium text-gray-400">{prog.duration}</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
