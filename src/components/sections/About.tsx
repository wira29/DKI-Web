import FadeIn from '../ui/FadeIn';
import Image from 'next/image';

export default function About({ data: aboutData }: { data: any }) {
  if (!aboutData) return null;
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold text-black mb-6 tracking-tight leading-tight">
                {aboutData.title}
              </h2>
              <div 
                className="text-xl text-gray-500 mb-12 leading-relaxed font-light prose prose-lg prose-p:text-xl prose-p:text-gray-500 prose-strong:text-black"
                dangerouslySetInnerHTML={{ __html: aboutData.description }}
              />
              <div className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-10">
                {aboutData.stats.map((stat: { value: string; label: string }, i: number) => (
                  <div key={i}>
                    <div className="text-4xl font-semibold text-black tracking-tight mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-square">
              <Image 
                src={aboutData.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"} 
                alt={aboutData.title || "Students collaborating"} 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
