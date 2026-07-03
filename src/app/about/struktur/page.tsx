import { getCmsData } from '@/lib/api';
export default async function StrukturPage() {
  const data = await getCmsData();
  const about = data?.aboutData;

  if (!about || !about.org_structure_image) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Tim Kami.</h2>
          <p className="text-xl text-gray-500 font-medium">Struktur organisasi belum tersedia.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="pt-40 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4">
          Struktur.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium tracking-tight max-w-2xl mx-auto">
          Formasi tim pimpinan dan divisi di balik layar Digital Kompetensi Indonesia.
        </p>
      </section>

      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-32">
         <div className="w-full bg-[#f5f5f7] rounded-[3rem] p-8 md:p-16 flex items-center justify-center">
           <img 
            src={about.org_structure_image} 
            alt="Struktur Organisasi" 
            className="w-full h-auto max-w-6xl rounded-2xl shadow-sm" 
           />
         </div>
      </section>

    </main>
  );
}
