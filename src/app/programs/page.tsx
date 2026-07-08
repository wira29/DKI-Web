import { BookOpen, Code2, Rocket } from 'lucide-react';
import { prisma } from '@/lib/db';
import ProgramsList from '@/components/ui/ProgramsList';

export const dynamic = 'force-dynamic';


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daftar Program Kursus & Pelatihan',
  description: 'Jelajahi berbagai program kursus dan pelatihan IT yang diselenggarakan oleh Digital Kompetensi Indonesia.',
};

export default async function ProgramsPage() {
  const programsData = await prisma.program.findMany();
  const categoriesData = await prisma.category.findMany();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
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
                <Rocket className="w-4 h-4 text-white" />
                <span>Katalog Program</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
                Program Pelatihan
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                Pilih program yang sesuai dengan passion Anda dan mulailah membangun karir di industri teknologi melalui kurikulum intensif kami.
              </p>
            </div>
            
            {/* Illustration Graphic for Hero */}
            <div className="hidden md:flex relative w-64 h-64 shrink-0 items-center justify-center">
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 bg-white/5 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500">
                <Code2 className="w-12 h-12 text-white" />
              </div>
              
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-xl -rotate-12 animate-bounce-slow">
                <BookOpen className="w-8 h-8 text-white" />
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

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ProgramsList programsData={programsData} categoriesData={categoriesData} />
        </div>
      </section>
    </div>
  );
}
