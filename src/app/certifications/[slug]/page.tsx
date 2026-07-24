import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cert = await prisma.certification.findUnique({ where: { slug } });
  
  if (!cert) return { title: 'Sertifikasi Tidak Ditemukan' };

  return {
    title: cert.title,
    description: cert.short_description,
    openGraph: {
      title: cert.title,
      description: cert.short_description,
      images: [cert.image],
    }
  };
}

export default async function CertificationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cert = await prisma.certification.findUnique({ where: { slug } });
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
              {cert.description ? (
                <div 
                  className="text-lg text-gray-500 leading-relaxed font-light w-full break-words overflow-hidden [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:my-4 [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-black [&_b]:font-semibold [&_b]:text-black [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:text-black [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-black [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-black [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-black [&_h4]:mt-4 [&_h4]:mb-2 [&_img]:max-w-full [&_img]:h-auto [&_pre]:max-w-full [&_pre]:overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: cert.description }}
                />
              ) : (
                <div className="text-lg text-gray-500 leading-relaxed font-light space-y-6">
                  <p>
                    Sertifikasi {cert.title} adalah pengakuan formal atas kompetensi Anda sesuai dengan standar yang ditetapkan oleh {cert.issuing_body}. Memiliki sertifikasi ini akan secara drastis meningkatkan portofolio dan nilai jual Anda di mata perekrut industri teknologi.
                  </p>
                  <p>
                    Ujian akan terdiri dari tes teori dan tes praktek. Peserta diharapkan sudah memiliki pemahaman fundamental yang memadai sebelum mengikuti jadwal ujian ini.
                  </p>
                </div>
              )}
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
