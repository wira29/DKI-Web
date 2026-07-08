import { prisma } from '@/lib/db';
import { ArrowLeft, Calendar, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const newsItem = await prisma.post.findUnique({ where: { id } });
  
  if (!newsItem) return { title: 'Berita Tidak Ditemukan' };

  return {
    title: newsItem.title,
    description: newsItem.short_description,
    openGraph: {
      title: newsItem.title,
      description: newsItem.short_description,
      images: [newsItem.image],
    }
  };
}

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const newsItem = await prisma.post.findUnique({ where: { id } });

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Berita Tidak Ditemukan</h1>
          <Link href="/news" className="text-primary hover:text-primary-hover">Kembali ke pusat informasi</Link>
        </div>
      </div>
    );
  }

  const dateFormatted = newsItem.published_at 
    ? new Date(newsItem.published_at).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) 
    : '';

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

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold tracking-wide uppercase mb-8 backdrop-blur-md">
            <Newspaper className="w-4 h-4 text-white" />
            <span>Berita Terkini</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-[1.2] max-w-4xl mx-auto">
            {newsItem.title}
          </h1>
          
          {newsItem.published_at && (
            <div className="flex items-center justify-center gap-3 text-white/70">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span>Dipublikasikan pada {dateFormatted}</span>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-6 -mt-32 relative z-20 pb-32">
        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-gray-100 mb-10 w-full shadow-2xl border border-white/10">
          <img 
            src={newsItem.image} 
            alt={newsItem.title}
            className="w-full h-full object-cover"
          />
          
          <Link href="/news" className="absolute top-6 left-6 inline-flex items-center text-sm font-medium text-white hover:text-white/80 transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </Link>
        </div>

        <div className="px-4 md:px-0 mb-8 flex items-center gap-4 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Newspaper className="w-5 h-5" />
            <span>Berita Terkini</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{dateFormatted}</span>
          </div>
        </div>

        <div 
          className="text-lg text-gray-700 leading-relaxed font-light space-y-6 prose prose-lg prose-p:text-gray-700 prose-headings:text-black max-w-none px-4 md:px-0"
          dangerouslySetInnerHTML={{ __html: newsItem.short_description || '' }}
        />
      </section>
    </main>
  );
}
