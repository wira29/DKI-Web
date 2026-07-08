'use client';

import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar({ categories = [] }: { categories?: any[] }) {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileProgramOpen, setMobileProgramOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false);
  
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
      const threshold = window.innerHeight - 80; 
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

  const navLinkClass = `px-3 py-2 text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 text-gray-500 hover:text-black`;

  const dropdownClass = "absolute left-0 mt-2 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-xl flex flex-col z-50 overflow-visible";

  const dropdownItemClass = "px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap block";

  const kursusCats = categories.filter(c => (c.type || 'KURSUS') === 'KURSUS');
  const pkCats = categories.filter(c => c.type === 'PELATIHAN_KERJA');

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-2 md:gap-3 text-sm sm:text-base md:text-xl font-bold text-black"
            >
              <Image src="/logo.webp" alt="Logo DKI" width={36} height={36} className="h-8 md:h-9 w-auto rounded-sm object-contain bg-transparent" priority />
              <span className="tracking-tight whitespace-nowrap text-[#132842]"><span className='text-primary'>Digital</span> Kompetensi Indonesia</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <div className="flex space-x-1 lg:space-x-2 items-center">
            {/* Beranda */}
            <Link href="/" className={navLinkClass}>Beranda</Link>
            
            {/* Tentang */}
            <div className="relative group">
              <div className={navLinkClass}>
                Tentang <ChevronDown className="w-4 h-4" />
              </div>
              <div className={`${dropdownClass} w-48`}>
                <Link href="/about/profil" className={dropdownItemClass}>Profil & Visi Misi</Link>
                <Link href="/about/struktur" className={dropdownItemClass}>Struktur Organisasi</Link>
                <Link href="/about/logo" className={dropdownItemClass}>Filosofi Logo</Link>
              </div>
            </div>

            {/* Program */}
            <div className="relative group">
              <div className={navLinkClass}>
                Program <ChevronDown className="w-4 h-4" />
              </div>
              <div className={`${dropdownClass} w-56 p-2`}>
                
                {/* Lembaga Kursus */}
                <div className="relative group/sub rounded-lg hover:bg-gray-50">
                  <div className="px-3 py-2.5 text-sm text-gray-700 cursor-pointer flex justify-between items-center">
                    Lembaga Kursus <ChevronRight className="w-4 h-4" />
                  </div>
                  <div className="absolute left-full top-0 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 rounded-xl flex flex-col z-50 p-2 -ml-2">
                    {kursusCats.length > 0 ? kursusCats.map(c => (
                      <Link key={c.id} href={`/programs?category=${encodeURIComponent(c.name)}`} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                        {c.name}
                      </Link>
                    )) : <div className="px-3 py-2 text-sm text-gray-400">Belum ada kategori</div>}
                  </div>
                </div>

                {/* Lembaga Pelatihan Kerja */}
                <div className="relative group/sub2 rounded-lg hover:bg-gray-50">
                  <div className="px-3 py-2.5 text-sm text-gray-700 cursor-pointer flex justify-between items-center">
                    Lembaga Pelatihan Kerja <ChevronRight className="w-4 h-4" />
                  </div>
                  <div className="absolute left-full top-0 w-48 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover/sub2:opacity-100 group-hover/sub2:visible transition-all duration-200 rounded-xl flex flex-col z-50 p-2 -ml-2">
                    {pkCats.length > 0 ? pkCats.map(c => (
                      <Link key={c.id} href={`/programs?category=${encodeURIComponent(c.name)}`} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                        {c.name}
                      </Link>
                    )) : <div className="px-3 py-2 text-sm text-gray-400">Belum ada kategori</div>}
                  </div>
                </div>

                {/* Sertifikasi */}
                <Link href="/certifications" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg block mt-1">
                  Sertifikasi Kompetensi
                </Link>
              </div>
            </div>

            {/* Berita & Artikel */}
            <div className="relative group">
              <div className={navLinkClass}>
                Berita & Artikel <ChevronDown className="w-4 h-4" />
              </div>
              <div className={`${dropdownClass} w-40`}>
                <Link href="/news" className={dropdownItemClass}>Berita</Link>
                <Link href="/articles" className={dropdownItemClass}>Artikel</Link>
              </div>
            </div>

            {/* Hubungi */}
            <Link href="/contact" className={navLinkClass}>Hubungi</Link>
            </div>
{/* 
            <Link 
              href="/#programs"
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all bg-primary hover:bg-primary-hover text-white shadow-sm"
            >
              Daftar Sekarang
            </Link> */}
          </div>
          
          <div className="flex md:hidden items-center ml-auto">
            <button 
              aria-label="Buka menu navigasi"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 rounded-md text-black"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute top-full left-0 w-full py-4 px-6 flex flex-col max-h-[80vh] overflow-y-auto">
          
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-black font-medium text-lg py-3 border-b border-gray-50">Beranda</Link>
          
          <div className="border-b border-gray-50 py-3">
            <button onClick={() => setMobileAboutOpen(!mobileAboutOpen)} className="w-full flex justify-between items-center text-gray-700 font-medium text-lg">
              Tentang <ChevronDown className={`w-5 h-5 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileAboutOpen && (
              <div className="flex flex-col gap-3 mt-4 pl-4 border-l-2 border-gray-100">
                <Link href="/about/profil" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black">Profil & Visi Misi</Link>
                <Link href="/about/struktur" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black">Struktur Organisasi</Link>
                <Link href="/about/logo" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black">Filosofi Logo</Link>
              </div>
            )}
          </div>

          <div className="border-b border-gray-50 py-3">
            <button onClick={() => setMobileProgramOpen(!mobileProgramOpen)} className="w-full flex justify-between items-center text-gray-700 font-medium text-lg">
              Program <ChevronDown className={`w-5 h-5 transition-transform ${mobileProgramOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileProgramOpen && (
              <div className="flex flex-col gap-4 mt-4 pl-4 border-l-2 border-gray-100">
                
                <div>
                  <div className="font-semibold text-gray-700 mb-2">Lembaga Kursus</div>
                  <div className="flex flex-col gap-2 pl-3">
                    {kursusCats.length > 0 ? kursusCats.map(c => (
                      <Link key={c.id} href={`/programs?category=${encodeURIComponent(c.name)}`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-gray-500 hover:text-black">
                        - {c.name}
                      </Link>
                    )) : <span className="text-sm text-gray-400">Belum ada</span>}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-gray-700 mb-2">Lembaga Pelatihan Kerja</div>
                  <div className="flex flex-col gap-2 pl-3">
                    {pkCats.length > 0 ? pkCats.map(c => (
                      <Link key={c.id} href={`/programs?category=${encodeURIComponent(c.name)}`} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-gray-500 hover:text-black">
                        - {c.name}
                      </Link>
                    )) : <span className="text-sm text-gray-400">Belum ada</span>}
                  </div>
                </div>

                <Link href="/certifications" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-gray-700">Sertifikasi Kompetensi</Link>
              </div>
            )}
          </div>

          <div className="border-b border-gray-50 py-3">
            <button onClick={() => setMobileNewsOpen(!mobileNewsOpen)} className="w-full flex justify-between items-center text-gray-700 font-medium text-lg">
              Berita & Artikel <ChevronDown className={`w-5 h-5 transition-transform ${mobileNewsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileNewsOpen && (
              <div className="flex flex-col gap-3 mt-4 pl-4 border-l-2 border-gray-100">
                <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black">Berita</Link>
                <Link href="/articles" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-black">Artikel</Link>
              </div>
            )}
          </div>

          <Link href="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-black font-medium text-lg py-3 border-b border-gray-50">Acara</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-black font-medium text-lg py-3 border-b border-gray-50">Hubungi</Link>
          
          <Link 
            href="/#programs"
            className="w-full mt-6 bg-primary hover:bg-primary-hover transition-colors text-white py-3 rounded-full font-medium text-center inline-block"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Daftar Sekarang
          </Link>
        </div>
      )}
    </nav>
  );
}
