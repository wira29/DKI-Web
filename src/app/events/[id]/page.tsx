import { prisma } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id }
  });

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Acara Tidak Ditemukan</h1>
          <Link href="/events" className="text-gray-500 hover:text-black">Kembali ke daftar acara</Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = `Halo DKI, saya tertarik untuk mengikuti acara: ${event.title}. Mohon informasi pendaftarannya.`;
  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`;
  const dateFormatted = new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeFormatted = new Date(event.event_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <Link href="/events" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-black transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Acara
        </Link>

        <div className="mb-12 max-w-4xl">
          <div className="inline-block px-3 py-1 mb-6 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            {event.location_type} EVENT
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-black tracking-tight mb-6 leading-tight">
            {event.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            {event.short_description}
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[450px] bg-gray-100 mb-16 w-full">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-semibold text-black mb-6">Detail Acara</h2>
              <div className="text-lg text-gray-500 leading-relaxed font-light space-y-6">
                <p>
                  Acara ini bertujuan untuk membekali partisipan dengan wawasan berharga dan inspirasi terbaru di bidang teknologi. Dengan mengikuti sesi ini, Anda akan mendapatkan pandangan langsung dari praktisi industri mengenai tren, tantangan, dan peluang di masa depan.
                </p>
                <p>
                  Sesi akan diakhiri dengan diskusi interaktif dan tanya jawab (Q&A), sehingga Anda bebas mengeksplorasi topik lebih dalam. Jangan lewatkan kesempatan untuk memperluas jaringan (networking) dengan sesama penggiat teknologi.
                </p>
              </div>
            </section>
          </div>

          <div>
            <div className="bg-[#FAFAFA] border border-black/[0.04] p-8 rounded-3xl sticky top-32">
              <div className="mb-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-full border border-gray-100">
                    <Calendar className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Waktu Pelaksanaan</div>
                    <div className="font-semibold text-black">{dateFormatted}</div>
                    <div className="text-sm text-gray-500">{timeFormatted}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-full border border-gray-100">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-1">Lokasi</div>
                    <div className="font-semibold text-black">{event.location_type}</div>
                    <div className="text-sm text-gray-500">Link / Detail venue akan dikirim setelah pendaftaran.</div>
                  </div>
                </div>
              </div>
              
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-black hover:bg-gray-800 text-white py-4 rounded-full font-medium transition-all active:scale-95 mb-4"
              >
                Reservasi Tempat
              </a>
              <p className="text-xs text-center text-gray-400">
                Pendaftaran melalui admin WhatsApp. Kuota terbatas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
