import { getCmsData } from '@/lib/api';
export default async function LogoPage() {
  const data = await getCmsData();
  const about = data?.aboutData;
  if (!about) return null;

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-black">
      {/* Apple-style Hero */}
      <section className="pt-40 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4">
          Identitas.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium tracking-tight max-w-2xl mx-auto">
          Makna mendalam di balik logo dan panduan penggunaannya.
        </p>
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
