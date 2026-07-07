'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero({ frames = [] }: { frames: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % frames.length);
    }, 5000); // Ganti slide setiap 5 detik
    return () => clearInterval(interval);
  }, [frames.length]);

  return (
    <section className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {frames.map((frame, index) => {
          if (index !== currentIndex) return null;
          return (
            <motion.div
              key={`slide-${frame.id || index}`}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image 
                  src={frame.image} 
                  alt={frame.title || "Background"}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-black/60" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="pointer-events-auto w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index === 0 ? 0 : 0.5, duration: 0.8 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg text-center"
                  >
                    {frame.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index === 0 ? 0.2 : 0.7, duration: 0.8 }}
                    className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl text-center mx-auto drop-shadow-md"
                  >
                    {frame.subtitle}
                  </motion.p>

                  {index === frames.length - 1 && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
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
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {frames.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
