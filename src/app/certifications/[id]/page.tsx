import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default async function CertificationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await prisma.certification.findUnique({ where: { id } });
  const footerData = await prisma.footerData.findFirst();

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Sertifikasi Tidak Ditemukan</h1>
          <Link href="/certifications" className="text-gray-500 hover:text-black">Kembali ke daftar</Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = `Halo DKI, saya tertarik untuk mendaftar pada jadwal sertifikasi: ${cert.title}. Mohon informasi pendaftarannya.`;
  
  let waNumber = '6281234567890'; // default fallback
  if (footerData && footerData.phone) {
    let cleanPhone = footerData.phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1);
    }
    waNumber = cleanPhone;
  }

  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <Link href="/certifications" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-black transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Jadwal
        </Link>

        <div className="mb-12 max-w-4xl">
          <div className="inline-block px-3 py-1 mb-6 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            {cert.issuing_body}
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-black tracking-tight mb-6 leading-tight">
            {cert.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            {cert.short_description}
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden h-[250px] md:h-[350px] bg-gray-100 mb-16 w-full">
          <img 
            src={cert.image} 
            alt={cert.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-semibold text-black mb-6">Tentang Sertifikasi</h2>
              <div className="text-lg text-gray-500 leading-relaxed font-light space-y-6">
                <p>
                  Sertifikasi {cert.title} adalah pengakuan formal atas kompetensi Anda sesuai dengan standar yang ditetapkan oleh {cert.issuing_body}. Memiliki sertifikasi ini akan secara drastis meningkatkan portofolio dan nilai jual Anda di mata perekrut industri teknologi.
                </p>
                <p>
                  Ujian akan terdiri dari tes teori dan tes praktek. Peserta diharapkan sudah memiliki pemahaman fundamental yang memadai sebelum mengikuti jadwal ujian ini.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-6">Persyaratan Peserta</h2>
              <ul className="space-y-4">
                {['Membawa laptop pribadi', 'Memiliki portfolio proyek relevan', 'Lulus tes prasyarat administrasi'].map((req, i) => (
                  <li key={i} className="flex items-start text-gray-500 font-light">
                    <CheckCircle2 className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div>
            <div className="bg-[#FAFAFA] border border-black/[0.04] p-8 rounded-3xl sticky top-32">
              <div className="text-sm font-medium text-gray-400 mb-2">Biaya Ujian</div>
              <div className="text-3xl font-semibold text-black tracking-tight mb-8">
                Rp {cert.price.toLocaleString('id-ID')}
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
