import * as Icons from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ frames = [], features = [] }: { frames?: any[], features?: any[] }) {
  const frame = frames.length > 0 ? frames[0] : {
    title: 'Jangan Bersaing dengan AI. <br /><span className="text-white/80 font-medium">Jadilah Developer yang Menguasainya</span>',
    subtitle: 'Tempat belajar coding, AI, dan cybersecurity supaya kamu tetap relevan di era AI. Dibimbing mentor praktisi aktif, bareng komunitas 223.000+ member.',
    tagline: 'EKOSISTEM BELAJAR DEVELOPER SEJAK 2016',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center bg-primary pt-20 md:pt-24 lg:pt-28 pb-6 md:pb-10 overflow-hidden font-sans">
      {/* Subtle Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-8">
          
          {/* Left Column (Text & CTAs) */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            {frame.tagline && (
              <div className="inline-block bg-white/10 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-white/20 backdrop-blur-sm">
                {frame.tagline}
              </div>
            )}
            
            <h1 
              className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-[1.25] mb-4"
              dangerouslySetInnerHTML={{ __html: frame.title }}
            />
            
            <p className="text-white/70 text-sm md:text-base mb-6 max-w-xl leading-relaxed">
              {frame.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 w-full sm:w-auto">
              <Link 
                href="/programs" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-primary px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 text-sm shadow-xl shadow-black/10"
              >
                <Icons.Play className="w-4 h-4 fill-current" /> Mulai Sekarang Gratis
              </Link>
              <Link 
                href="/programs" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 text-sm"
              >
                <Icons.Grid className="w-4 h-4" /> Lihat Semua Kelas
              </Link>
            </div>
            
            {/* <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-xs text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Icons.Zap className="w-3.5 h-3.5 text-yellow-300" /> Vibe Coding dengan AI
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Icons.CheckCircle2 className="w-3.5 h-3.5 text-green-300" /> Ethical Hacking
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Icons.Terminal className="w-3.5 h-3.5 text-blue-300" /> Fullstack & Fundamental
              </div>
            </div> */}
          </div>
          
          {/* Right Column (Image & Floating Badges) */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            {/* Background shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-black/15 rounded-3xl -z-10 blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-white/5 border border-white/10 rounded-3xl -z-10"></div>
            
            {/* Decorative Stars/Crosses */}
            <div className="absolute top-0 right-1/4 text-white opacity-30 text-xl">+</div>
            <div className="absolute top-1/4 right-6 text-white opacity-30 text-xl">+</div>
            <div className="absolute bottom-1/4 left-0 text-white opacity-30 text-xl">+</div>
            
            <div className="relative z-10 w-[85%] md:w-[75%] aspect-[5/4] max-w-[450px]">
              {/* Dummy Image representing the 3 people */}
              <Image 
                src={frame.image} 
                alt="Mentors and Students" 
                className="object-cover rounded-3xl shadow-2xl"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Floating Badge 1: User Aktif */}
              <div className="absolute top-6 -left-4 md:-left-8 bg-white rounded-xl p-2.5 shadow-2xl flex items-center gap-2.5 animate-bounce-slow">
                <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-medium leading-none mb-1">User aktif</div>
                  <div className="text-base font-bold text-gray-900 leading-none">217k+</div>
                </div>
              </div>
              
              {/* Floating Badge 2: 5 Stars */}
              <div className="absolute top-1/3 -right-4 md:-right-6 bg-white rounded-xl px-3 py-1.5 shadow-2xl flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Floating Badge 3: Total Course */}
              <div className="absolute bottom-6 -right-2 md:-right-4 bg-white rounded-xl p-2.5 shadow-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-medium leading-none mb-1">Total Course</div>
                  <div className="text-base font-bold text-gray-900 leading-none">370+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Categories Bar (Replaced Stats) */}
        <div className="w-full bg-white rounded-2xl p-4 md:p-6 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 divide-x divide-gray-100">
          {features.length > 0 ? features.map((feature: any) => {
            const IconComponent = (Icons as any)[feature.icon] || Icons.CheckCircle;
            return (
              <Link key={feature.id} href={feature.link} className="flex flex-col items-center justify-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm md:text-base font-bold text-gray-800 leading-tight">{feature.title}</span>
              </Link>
            );
          }) : (
            <div className="col-span-4 text-center py-4 text-gray-500">Belum ada fitur ditambahkan.</div>
          )}
        </div>
      </div>
      
      {/* Global CSS for slow bounce animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}
