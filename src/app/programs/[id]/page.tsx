import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function ProgramDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prog = await prisma.program.findUnique({ where: { id } });

  if (!prog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Program Tidak Ditemukan</h1>
          <Link href="/programs" className="text-gray-500 hover:text-black">Kembali ke daftar program</Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = `Halo DKI, saya tertarik untuk mendaftar program pelatihan: ${prog.title}. Mohon informasi pendaftarannya.`;
  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <Link href="/programs" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-black transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Program
        </Link>

        <div className="mb-12 max-w-4xl">
          <div className="flex gap-2 mb-6">
            <span className="inline-block px-3 py-1 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {prog.category}
            </span>
            {prog.badge && (
              <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-widest">
                {prog.badge}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-black tracking-tight mb-6 leading-tight">
            {prog.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            {prog.short_description}
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden h-[250px] md:h-[350px] bg-gray-200 mb-16 w-full">
          <img 
            src={prog.image} 
            alt={prog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-semibold text-black mb-6">Tentang Program Ini</h2>
              <div className="text-lg text-gray-500 leading-relaxed font-light space-y-6">
                <p>
                  Program intensif {prog.duration} ini dirancang secara khusus untuk membekali Anda dengan keterampilan praktis dan teoritis yang dibutuhkan industri teknologi saat ini. Dengan kurikulum yang berfokus pada studi kasus nyata, Anda tidak hanya belajar konsep, tetapi juga membangun portfolio yang solid.
                </p>
                <p>
                  Anda akan dibimbing langsung oleh mentor expert yang aktif bekerja di industri. Di akhir kelas, Anda akan mempresentasikan studi kasus akhir yang bisa langsung Anda pamerkan kepada calon perekrut.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-black mb-6">Yang Akan Anda Dapatkan</h2>
              <ul className="space-y-4">
                {['Akses materi seumur hidup', 'Sesi mentoring eksklusif', 'Sertifikat kelulusan digital', 'Bantuan penyaluran kerja (Hiring Partners)'].map((benefit, i) => (
                  <li key={i} className="flex items-start text-lg text-gray-500 font-light">
                    <CheckCircle2 className="w-6 h-6 text-black mr-4 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div>
            <div className="bg-white border border-black/[0.04] p-8 rounded-3xl sticky top-32 shadow-sm">
              <div className="text-sm font-medium text-gray-400 mb-2">Biaya Program ({prog.duration})</div>
              {prog.discount_price ? (
                <div className="mb-8">
                  <div className="text-lg text-gray-400 line-through mb-1">
                    Rp {prog.price.toLocaleString('id-ID')}
                  </div>
                  <div className="text-3xl font-semibold text-black tracking-tight">
                    Rp {prog.discount_price.toLocaleString('id-ID')}
                  </div>
                </div>
              ) : (
                <div className="text-3xl font-semibold text-black tracking-tight mb-8">
                  Rp {prog.price.toLocaleString('id-ID')}
                </div>
              )}
              
              <div className="mb-8 p-4 bg-gray-50 rounded-2xl flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">Level:</span>
                <span className="text-sm font-semibold text-black">{prog.level}</span>
              </div>
              
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-black hover:bg-gray-800 text-white py-4 rounded-full font-medium transition-all active:scale-95 mb-4"
              >
                Daftar via WhatsApp
              </a>
              <p className="text-xs text-center text-gray-400">
                Pendaftaran akan diarahkan ke admin WhatsApp kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
