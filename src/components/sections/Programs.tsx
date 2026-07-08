import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '../ui/FadeIn';

export default function Programs({ data: programsData = [] }: { data?: any[] }) {
  return (
    <section id="programs" className="py-20 bg-gray-50 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mb-4">Program Pelatihan.</h2>
              <p className="text-lg text-gray-500 font-light">Pilih program yang sesuai dengan passion Anda dan mulailah membangun karir di industri teknologi.</p>
            </div>
            <Link href="/programs" className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
              Lihat Semua Program
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {programsData.slice(0, 4).map((prog, index) => (
            <FadeIn key={prog.id} delay={index * 0.1}>
              <Link href={`/programs/${prog.id}`} className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500 flex flex-col h-[300px] md:h-[350px]">
                {/* Background Image */}
                <Image 
                  src={prog.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"}
                  alt={prog.title}
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
                      {prog.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white transition-colors duration-300 border border-white/30 group-hover:border-transparent">
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2 drop-shadow-md group-hover:text-white/90 transition-colors duration-300 leading-tight">{prog.title}</h3>
                    <p className="text-white/90 mb-4 font-light line-clamp-2 text-xs leading-relaxed drop-shadow-sm">{prog.short_description}</p>
                    
                    <div className="pt-4 flex items-center justify-between border-t border-white/30">
                      <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                        {prog.level}
                      </span>
                      <span className="text-xs font-medium text-white/90 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5"></span>
                        {prog.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
