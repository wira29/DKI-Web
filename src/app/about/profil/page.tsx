import { getCmsData } from '@/lib/api';
import { Building2, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profil',
  description: 'Profil Digital Kompetensi Indonesia, Visi, Misi, dan latar belakang lembaga.',
};

export default async function ProfilPage() {
  const data = await getCmsData();
  const about = data?.aboutData;
  if (!about) return null;

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-black">
      {/* Hero Section */}
      <section className="relative bg-primary pt-32 pb-24 overflow-hidden font-sans">
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
                <Building2 className="w-4 h-4 text-white" />
                <span>Tentang Kami</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
                Profil Lembaga
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                Mencetak talenta unggul masa depan industri digital dengan dedikasi penuh.
              </p>
            </div>
            
            {/* Illustration Graphic for Hero */}
            <div className="hidden md:flex relative w-64 h-64 shrink-0 items-center justify-center">
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 bg-white/5 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-xl -rotate-12 animate-bounce-slow">
                <Users className="w-8 h-8 text-white" />
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

      {/* Deskripsi & Gambar Side by Side */}
      <section className="max-w-7xl mx-auto px-6 pt-24 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#f5f5f7]">
            <img 
              src={about.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c"} 
              alt="Tentang Kami" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-6">
              {about.title}
            </h2>
            <div 
              className="text-base md:text-lg text-gray-500 leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ __html: about.description }}
            />
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="bg-[#f5f5f7] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Visi.</h2>
            <p className="text-lg md:text-2xl font-medium text-gray-800 leading-tight">
              {about.vision}
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Misi.</h2>
            <div className="space-y-6">
              {about.mission.map((item: string, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-lg font-semibold text-gray-400">0{i+1}</span>
                  <p className="text-base md:text-lg font-medium text-gray-800 leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
