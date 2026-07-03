import { getCmsData } from '@/lib/api';
export default async function ProfilPage() {
  const data = await getCmsData();
  const about = data?.aboutData;
  if (!about) return null;

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Apple-style Hero */}
      <section className="pt-40 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4">
          Profil Lembaga.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium tracking-tight max-w-2xl mx-auto">
          Mencetak talenta unggul masa depan industri digital dengan dedikasi penuh.
        </p>
      </section>

      {/* Deskripsi & Gambar Side by Side */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
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
