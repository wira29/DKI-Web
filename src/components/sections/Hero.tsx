'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const BackgroundFrame = ({ frame, index, totalFrames, inputRanges, scrollYProgress }: any) => {
  // Explicitly anchor values for every single frame to prevent extrapolation bounce-back
  const opacityRange = inputRanges.map((_: any, i: number) => (i === index ? 1 : 0));
  const opacity = useTransform(scrollYProgress, inputRanges, opacityRange);

  // Scale starts at 1, reaches 1.1 at the next frame, and stays at 1.1
  const scaleRange = inputRanges.map((_: any, i: number) => {
    if (i <= index) return 1;
    return 1.1;
  });
  const scale = useTransform(scrollYProgress, inputRanges, scaleRange);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{ opacity, scale, zIndex: 10 } as any}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${frame.image})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
    </motion.div>
  );
};

const ContentFrame = ({ frame, index, totalFrames, inputRanges, scrollYProgress }: any) => {
  const center = index / (totalFrames - 1);
  const detailedInputRanges = Array.from({ length: 101 }, (_, i) => i / 100);
  
  const opacityRange = detailedInputRanges.map(val => {
    const distance = Math.abs(val - center);
    // Teks bertahan penuh saat jarak < 0.05 dari titik tengah
    if (distance < 0.05) return 1;
    // Memudar lebih cepat dari 0.05 ke 0.15 agar tidak bocor ke frame lain
    if (distance < 0.15) return 1 - ((distance - 0.05) / 0.1);
    return 0;
  });

  const yRange = detailedInputRanges.map(val => {
    const distance = val - center;
    if (distance < -0.15) return 50;
    if (distance > 0.15) return -50;
    if (distance < 0) return Math.abs(distance / 0.15) * 50;
    return (distance / 0.15) * -50;
  });

  const opacity = useTransform(scrollYProgress, detailedInputRanges, opacityRange);
  const y = useTransform(scrollYProgress, detailedInputRanges, yRange);
  const isLastFrame = index === totalFrames - 1;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{ opacity, y } as any}
    >
      <div className="pointer-events-auto w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg text-center">
          {frame.title}
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl text-center mx-auto drop-shadow-md">
          {frame.subtitle}
        </p>

        {isLastFrame && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Link 
              href="/#programs"
              className="inline-block bg-white hover:bg-gray-100 text-black px-6 py-3 text-base md:px-10 md:py-4 md:text-lg rounded-full font-semibold transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              Mulai Perjalananmu Sekarang
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default function Hero({ frames = [] }: { frames: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const totalFrames = frames.length;
  const inputRanges = Array.from({ length: totalFrames }, (_: any, i: number) => i / (totalFrames - 1));

  return (
    <section ref={containerRef} className="relative h-[250vh] md:h-[400vh] bg-black">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Images Crossfade */}
        {frames.map((frame, index) => (
          <BackgroundFrame 
            key={`bg-${frame.id}`} 
            frame={frame} 
            index={index} 
            totalFrames={totalFrames} 
            inputRanges={inputRanges} 
            scrollYProgress={scrollYProgress} 
          />
        ))}

        {/* Foreground Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto">
          {frames.map((frame, index) => (
            <ContentFrame 
              key={`content-${frame.id}`} 
              frame={frame} 
              index={index} 
              totalFrames={totalFrames} 
              inputRanges={inputRanges} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center text-white/70"
          style={{ 
            opacity: useTransform(scrollYProgress, [0.8, 1], [1, 0])
          } as any}
        >
          <span className="text-sm mb-3 uppercase tracking-widest font-semibold">Scroll Perlahan</span>
          <div className="w-[2px] h-20 bg-white/20 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/3 bg-white rounded-full"
              animate={{ top: ['-50%', '150%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
