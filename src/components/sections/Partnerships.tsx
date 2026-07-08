import * as Icons from 'lucide-react';
import FadeIn from '../ui/FadeIn';

export default function Partnerships({ data = [] }: { data?: any[] }) {
  // Process dynamic data
  const topRowTools = data.filter(d => d.row === 'TOP').map(tool => ({
    name: tool.name,
    desc: tool.description,
    icon: (Icons as any)[tool.icon || 'CheckCircle'] || Icons.CheckCircle,
    logo: tool.logo,
    color: tool.color
  }));

  const bottomRowTools = data.filter(d => d.row === 'BOTTOM').map(tool => ({
    name: tool.name,
    desc: tool.description,
    icon: (Icons as any)[tool.icon || 'CheckCircle'] || Icons.CheckCircle,
    logo: tool.logo,
    color: tool.color
  }));
  return (
    <section id="partnerships" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-16">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-4 block">Kerja Sama</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
                Mitra dan Teknologi<br />Standar Industri
              </h2>
            </div>
            <div className="max-w-md pt-2 md:pt-10">
              <p className="text-lg text-gray-500 font-light leading-relaxed">
                Kami berkolaborasi dengan perusahaan terkemuka dan mengajarkan tools yang benar-benar digunakan oleh profesional di dunia kerja saat ini.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full flex flex-col gap-6 pause-on-hover">
        {/* Top Row - Moves Left */}
        <div className="flex w-max animate-marquee-left">
          {/* We render the array twice to create a seamless infinite loop effect */}
          {[...topRowTools, ...topRowTools, ...topRowTools].map((tool, index) => (
            <div 
              key={`top-${index}`} 
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 mx-3 min-w-[280px] shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 overflow-hidden ${tool.color}`}>
                {tool.logo ? (
                  <img src={tool.logo} alt={tool.name} className="w-10 h-10 object-contain" />
                ) : (
                  <tool.icon className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{tool.name}</h3>
                <p className="text-sm text-gray-500">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row - Moves Right */}
        <div className="flex w-max animate-marquee-right">
          {[...bottomRowTools, ...bottomRowTools, ...bottomRowTools].map((tool, index) => (
            <div 
              key={`bottom-${index}`} 
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 mx-3 min-w-[280px] shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 overflow-hidden ${tool.color}`}>
                {tool.logo ? (
                  <img src={tool.logo} alt={tool.name} className="w-10 h-10 object-contain" />
                ) : (
                  <tool.icon className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{tool.name}</h3>
                <p className="text-sm text-gray-500">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient Fades on edges for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
}
