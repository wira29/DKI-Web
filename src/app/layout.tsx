import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getCmsData } from '@/lib/api';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Digital Kompetensi Indonesia',
    default: 'Digital Kompetensi Indonesia (DKI) - Lembaga Kursus & Pelatihan',
  },
  description: 'Lembaga Pelatihan Kerja (LPK), Kursus, dan Sertifikasi Kompetensi terkemuka di bidang digital. Mencetak talenta unggul untuk masa depan.',
  keywords: ['Lembaga Kursus', 'Lembaga Pelatihan Kerja', 'Sertifikasi Kompetensi', 'LPK DKI', 'Digital Kompetensi Indonesia', 'Pelatihan IT'],
  openGraph: {
    title: 'Digital Kompetensi Indonesia (DKI)',
    description: 'Lembaga Pelatihan Kerja (LPK) & Sertifikasi Kompetensi terkemuka.',
    url: 'https://www.digitalkompetensi.id',
    siteName: 'Digital Kompetensi Indonesia',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getCmsData();
  const categories = data?.categoriesData || [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Digital Kompetensi Indonesia',
    url: 'https://www.digitalkompetensi.id',
    logo: 'https://www.digitalkompetensi.id/icon.png',
    description: 'Lembaga Pelatihan Kerja (LPK), Kursus, dan Sertifikasi Kompetensi terkemuka di bidang digital.',
    sameAs: [
      'https://www.facebook.com/digitalkompetensi',
      'https://www.instagram.com/digitalkompetensi',
      'https://www.linkedin.com/company/digitalkompetensi'
    ]
  };

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <Navbar categories={categories} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
