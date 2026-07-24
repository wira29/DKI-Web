'use client';

import { useState, useEffect, use } from 'react';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import WysiwygEditor from '@/components/admin/WysiwygEditor';
import ImageSelector from '@/components/admin/ImageSelector';

export default function CmsCertificationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const [cert, setCert] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        setData(json);
        if (id === 'new') {
          setCert({
            id: 'cert-' + Date.now(),
            title: '',
            short_description: '',
            image: '',
            issuing_body: '',
            price: 0,
            description: ''
          });
        } else {
          const found = json.certificationsData.find((p: any) => p.id === id);
          if (found) {
            setCert({
              ...found,
              description: found.description || ''
            });
          }
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    const newData = { ...data };
    
    if (id === 'new') {
      newData.certificationsData.push(cert);
    } else {
      const index = newData.certificationsData.findIndex((p: any) => p.id === cert.id);
      if (index !== -1) {
        newData.certificationsData[index] = cert;
      }
    }

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        router.push('/cms/certifications');
      } else {
        alert('Gagal menyimpan perubahan.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    }
    setIsSaving(false);
  };

  if (!cert || !data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="w-full pb-20">
      <div className="mb-6">
        <Link href="/cms/certifications" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Sertifikasi
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">
            {id === 'new' ? 'Tambah Sertifikasi Baru' : 'Edit Sertifikasi'}
          </h2>
          <p className="text-gray-500">Lengkapi detail informasi sertifikasi kompetensi.</p>
        </div>
        <div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Sertifikasi
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Sertifikasi</label>
            <input 
              type="text" 
              value={cert.title} 
              onChange={e => setCert({...cert, title: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Deskripsi Singkat</label>
            <input 
              type="text" 
              value={cert.short_description} 
              onChange={e => setCert({...cert, short_description: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Penjelasan Sertifikasi (WYSIWYG)</label>
            <WysiwygEditor 
              value={cert.description} 
              onChange={(val) => setCert({...cert, description: val})} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
            <ImageSelector 
              value={cert.image} 
              onChange={(val) => setCert({...cert, image: val})} 
            />
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badan Penerbit (Issuing Body)</label>
              <input 
                type="text" 
                value={cert.issuing_body} 
                onChange={e => setCert({...cert, issuing_body: e.target.value})}
                placeholder="e.g. BNSP, Google, Microsoft"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Biaya (Rp)</label>
              <input 
                type="number" 
                value={cert.price} 
                onChange={e => setCert({...cert, price: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
