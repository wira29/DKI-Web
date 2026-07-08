const fs = require('fs');

const updates = [
  { file: 'src/app/about/struktur/page.tsx', title: 'Struktur Organisasi', desc: 'Struktur organisasi dan jajaran pengurus Digital Kompetensi Indonesia.' },
  { file: 'src/app/about/logo/page.tsx', title: 'Filosofi & Penggunaan Logo', desc: 'Panduan penggunaan dan filosofi makna logo Digital Kompetensi Indonesia.' },
  { file: 'src/app/contact/page.tsx', title: 'Hubungi Kami', desc: 'Informasi kontak, alamat, email, dan telepon Digital Kompetensi Indonesia.' },
  { file: 'src/app/programs/page.tsx', title: 'Daftar Program Kursus & Pelatihan', desc: 'Jelajahi berbagai program kursus dan pelatihan IT yang diselenggarakan oleh Digital Kompetensi Indonesia.' },
  { file: 'src/app/certifications/page.tsx', title: 'Sertifikasi Kompetensi', desc: 'Daftar sertifikasi kompetensi IT resmi yang difasilitasi oleh Digital Kompetensi Indonesia.' },
  { file: 'src/app/articles/page.tsx', title: 'Artikel', desc: 'Kumpulan artikel dan wawasan terbaru seputar dunia IT dan teknologi.' },
  { file: 'src/app/news/page.tsx', title: 'Berita', desc: 'Berita terbaru seputar aktivitas, acara, dan informasi penting dari Digital Kompetensi Indonesia.' }
];

updates.forEach(u => {
  if(!fs.existsSync(u.file)) {
    console.log('Not found: ' + u.file);
    return;
  }
  let content = fs.readFileSync(u.file, 'utf8');
  if (content.includes('export const metadata')) return;
  
  const meta = `\nimport { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${u.title}',\n  description: '${u.desc}',\n};\n\n`;
  const parts = content.split('export default');
  
  if (parts.length > 1) {
    content = parts[0] + meta + 'export default' + parts.slice(1).join('export default');
    fs.writeFileSync(u.file, content);
    console.log('Updated ' + u.file);
  }
});
