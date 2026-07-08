'use client';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import ContactForm from '../ui/ContactForm';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-4 block">Hubungi Kami</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Punya Pertanyaan?
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Tim kami siap membantu Anda memilih program yang tepat atau mendiskusikan peluang kerja sama.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <FadeIn delay={0.1}>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                  <p className="text-sm text-gray-500">hello@web-dki.id</p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Telepon</h4>
                  <p className="text-sm text-gray-500">+62 811 2222 3333</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Alamat</h4>
                  <p className="text-sm text-gray-500">Jl. Teknologi Cerdas No. 123<br/>Jakarta Selatan, 12345</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-2">
            <FadeIn delay={0.4}>
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
