import { getCmsData } from '@/lib/api';
import { Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Informasi kontak, alamat, email, dan telepon Digital Kompetensi Indonesia.',
};

export default async function ContactPage() {
  const data = await getCmsData();
  const footerData = data?.footerData;

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-black">
      {/* Hero Section */}
      <section className="relative bg-primary pt-32 pb-24 overflow-hidden font-sans mb-16">
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
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Hubungi Kami</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.15]">
                Kirim Pesan
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                Punya pertanyaan tentang program, sertifikasi, atau kerja sama? Tim kami siap membantu Anda.
              </p>
            </div>
            
            {/* Illustration Graphic for Hero */}
            <div className="hidden md:flex relative w-64 h-64 shrink-0 items-center justify-center">
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 bg-white/5 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl rotate-12 hover:rotate-0 transition-transform duration-500">
                <MessageSquare className="w-12 h-12 text-white" />
              </div>
              
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-xl -rotate-12 animate-bounce-slow">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Global CSS for animations */}
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

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Informasi Kontak</h2>
              <p className="text-gray-500 leading-relaxed">
                Silakan hubungi kami melalui salah satu kontak di bawah ini, atau kunjungi kantor kami langsung.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Alamat</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {footerData?.address || "Jl. Contoh Alamat No. 123, Jakarta"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {footerData?.email || "info@dki.example.com"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telepon / WhatsApp</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {footerData?.phone || "+62 812 3456 7890"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mt-8">
              <h4 className="font-semibold text-gray-900 mb-2">Jam Operasional</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex justify-between border-b border-gray-50 pb-2">
                  <span>Senin - Jumat</span>
                  <span className="font-medium text-gray-900">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between border-b border-gray-50 pb-2 pt-1">
                  <span>Sabtu</span>
                  <span className="font-medium text-gray-900">09:00 - 14:00</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span>Minggu & Hari Libur</span>
                  <span className="font-medium text-red-500">Tutup</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-3 bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-[2.5rem] p-8 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Kirimkan Pesan</h2>
            <ContactForm />
          </div>

        </div>
      </section>
    </main>
  );
}
