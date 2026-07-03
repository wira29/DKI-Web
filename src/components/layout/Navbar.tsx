'use client';

import { navigationLinks } from '@/lib/dummy-data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (pathname.startsWith('/cms')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) {
        setIsScrolledPastHero(true);
        return;
      }
      const scrollY = window.scrollY;
      const threshold = 8.8 * window.innerHeight; 
      setIsScrolledPastHero(scrollY > threshold);
    };

    if (!isHomePage) {
      setIsScrolledPastHero(true);
    } else {
      handleScroll();
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <nav 
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${
        isScrolledPastHero 
          ? 'bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm py-0' 
          : 'bg-transparent border-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className={`flex items-center gap-3 text-2xl font-bold transition-colors ${
                isScrolledPastHero ? 'text-black' : 'text-white drop-shadow-md'
              }`}
            >
              <img src="/logo.png" alt="Logo DKI" className="h-9 w-auto rounded-sm object-contain bg-transparent" />
              <span>DKI</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolledPastHero 
                    ? 'text-gray-500 hover:text-black' 
                    : 'text-gray-200 hover:text-white drop-shadow-md'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center">
            <Link 
              href="/#programs"
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                isScrolledPastHero 
                  ? 'bg-black hover:bg-gray-800 text-white shadow-sm' 
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30'
              }`}
            >
              Daftar Sekarang
            </Link>
          </div>
          
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`p-2 rounded-md ${isScrolledPastHero ? 'text-black' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute top-full left-0 w-full py-4 px-6 flex flex-col gap-4">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-black font-medium text-lg py-2 border-b border-gray-50"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href="/#programs"
            className="w-full mt-4 bg-black text-white py-3 rounded-full font-medium text-center inline-block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Daftar Sekarang
          </Link>
        </div>
      )}
    </nav>
  );
}
