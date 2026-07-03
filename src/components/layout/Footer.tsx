'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Footer() {
  const pathname = usePathname();
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        if (json.footerData) {
          setFooterData(json.footerData);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (pathname.startsWith('/cms')) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <span className="text-2xl font-bold text-white mb-4 block">DKI</span>
            <p className="text-sm text-gray-400">
              {footerData?.description || "Lembaga pelatihan dan sertifikasi kompetensi terdepan untuk talenta digital masa depan."}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Program</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Digital Marketing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Internet of Things</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Coding Anak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kemitraan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Karir</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
            <p className="text-sm text-gray-400 mb-2">{footerData?.address || "Jl. Contoh Alamat No. 123, Jakarta"}</p>
            <p className="text-sm text-gray-400 mb-2">{footerData?.email || "info@dki.example.com"}</p>
            <p className="text-sm text-gray-400">{footerData?.phone || "+62 812 3456 7890"}</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Digital Kompetensi Indonesia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
