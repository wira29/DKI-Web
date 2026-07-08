import { getCmsData } from '@/lib/api';
import { Fingerprint, Palette } from 'lucide-react';


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Filosofi & Penggunaan Logo',
  description: 'Panduan penggunaan dan filosofi makna logo Digital Kompetensi Indonesia.',
};

export default async function LogoPage() {
  const data = await getCmsData();
  const about = data?.aboutData;
  if (!about) return null;

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-black">
      {/* Hero Section */}
      <section className="relative bg-primary pt-32 pb-24 overflow-hidden font-sans mb-16">
        {/* Subtle Grid Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Decorative Ornaments */}
        <div className="absolute top-20 right-[10%] text-white/20 text-4xl animate-pulse font-light">+</div>
        <div className="absolute bottom-20 left-[5%] text-white/20 text-3xl animate-bounce font-light">+</div>
        <div className="absolute top-40 left-[15%] w-2 h-2 rounded-full bg-white/30"></div>
        <div className="absolute bottom-32 right-[20%] w-3 h-3 rounded-full bg-white/30"></div>
        
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
                <Palette className="w-4 h-4 text-white" />
                <span>Identitas Merek</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
                Filosofi & Logo
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                Makna mendalam di balik identitas visual dan panduan penggunaannya.
              </p>
            </div>
            
            {/* Illustration Graphic for Hero */}
            <div className="hidden md:flex relative w-64 h-64 shrink-0 items-center justify-center">
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 bg-white/5 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500">
                <Palette className="w-12 h-12 text-white" />
              </div>
              
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-xl -rotate-12 animate-bounce-slow">
                <Fingerprint className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Global CSS for animations if not present */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0) rotate(-12deg); }
            50% { transform: translateY(-10px) rotate(-12deg); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
          }
        `}} />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Gambar Logo */}
          <div className="w-full aspect-square bg-white border border-gray-100 rounded-[3rem] shadow-sm flex items-center justify-center p-12 lg:sticky lg:top-32">
            <img src="/logo.webp" alt="Logo DKI" className="w-full h-auto object-contain max-w-xs" />
          </div>
          
          {/* Teks Penjelasan */}
          <div className="space-y-16 py-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-black border-b border-gray-100 pb-6 mb-8">
                Filosofi.
              </h2>
              <div 
                className="text-base md:text-lg text-gray-500 leading-relaxed font-medium prose prose-p:text-gray-500 prose-headings:text-black"
                dangerouslySetInnerHTML={{ __html: about.logo_philosophy || 'Belum ada penjelasan filosofi logo.' }}
              />
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-black border-b border-gray-100 pb-6 mb-8">
                Penggunaan.
              </h2>
              <div 
                className="text-base md:text-lg text-gray-500 leading-relaxed font-medium prose prose-p:text-gray-500 prose-headings:text-black"
                dangerouslySetInnerHTML={{ __html: about.logo_usage || 'Belum ada panduan penggunaan logo.' }}
              />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
