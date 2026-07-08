'use client';

import { useState, useEffect, use } from 'react';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageSelector from '@/components/admin/ImageSelector';

export default function PartnerForm({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === 'new';
  const router = useRouter();
  
  const [data, setData] = useState<any>(null);
  const [partner, setPartner] = useState({
    id: isNew ? `partner-${Date.now()}` : resolvedParams.id,
    name: '',
    description: '',
    icon: '',
    logo: '',
    color: 'text-blue-500',
    row: 'TOP'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        setData(json);
        if (!isNew && json.partnersData) {
          const found = json.partnersData.find((p: any) => p.id === resolvedParams.id);
          if (found) setPartner(found);
        }
      })
      .catch(err => console.error(err));
  }, [isNew, resolvedParams.id]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    
    try {
      const newData = { ...data };
      if (!newData.partnersData) newData.partnersData = [];
      
      if (isNew) {
        newData.partnersData.push(partner);
      } else {
        const index = newData.partnersData.findIndex((p: any) => p.id === partner.id);
        if (index >= 0) {
          newData.partnersData[index] = partner;
        } else {
          newData.partnersData.push(partner);
        }
      }

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      
      if (res.ok) {
        setMessage('Data berhasil disimpan!');
        setTimeout(() => {
          router.push('/cms/partners');
        }, 1500);
      } else {
        setMessage('Gagal menyimpan data.');
      }
    } catch (err) {
      setMessage('Terjadi kesalahan jaringan.');
    }
    
    setIsSaving(false);
  };

  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="w-full pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cms/partners" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-1">
            {isNew ? 'Tambah Mitra/Teknologi' : 'Edit Mitra/Teknologi'}
          </h2>
          <p className="text-gray-500">Lengkapi informasi mitra atau teknologi di bawah ini.</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-8 text-sm font-medium ${message.includes('berhasil') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Mitra / Teknologi</label>
              <input 
                type="text" 
                value={partner.name} 
                onChange={e => setPartner({...partner, name: e.target.value})}
                placeholder="Contoh: React.js"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all text-sm text-black bg-white placeholder:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Singkat</label>
              <input 
                type="text" 
                value={partner.description} 
                onChange={e => setPartner({...partner, description: e.target.value})}
                placeholder="Contoh: Interface Components"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all text-sm text-black bg-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Posisi Baris (Marquee)</label>
              <select
                value={partner.row}
                onChange={e => setPartner({...partner, row: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all text-sm text-black bg-white"
              >
                <option value="TOP">Baris Atas (Berjalan ke Kiri)</option>
                <option value="BOTTOM">Baris Bawah (Berjalan ke Kanan)</option>
              </select>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ikon (Lucide)</label>
              <input 
                type="text" 
                value={partner.icon || ''} 
                onChange={e => setPartner({...partner, icon: e.target.value})}
                placeholder="Contoh: Layout, Database, Server"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all text-sm text-black bg-white placeholder:text-gray-500"
              />
              <p className="mt-2 text-xs text-gray-500">Lihat referensi ikon di <a href="https://lucide.dev/icons" target="_blank" className="text-blue-600 hover:underline">lucide.dev/icons</a>.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Atau Gunakan Logo / Gambar Perusahaan</label>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <ImageSelector 
                  value={partner.logo || ''} 
                  onChange={val => setPartner({...partner, logo: val})}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">Jika logo diisi, ikon (Lucide) akan diabaikan.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Warna Ikon (Tailwind Class)</label>
              <input 
                type="text" 
                value={partner.color || ''} 
                onChange={e => setPartner({...partner, color: e.target.value})}
                placeholder="Contoh: text-blue-500"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all text-sm text-black bg-white placeholder:text-gray-500"
              />
              <p className="mt-2 text-xs text-gray-500">Berlaku hanya jika menggunakan Ikon (Lucide). Contoh: text-red-500, text-green-600.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Data
          </button>
        </div>
      </div>
    </div>
  );
}
