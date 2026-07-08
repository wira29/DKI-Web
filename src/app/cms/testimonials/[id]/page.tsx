'use client';

import { useState, useEffect, use } from 'react';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageSelector from '@/components/admin/ImageSelector';

export default function CmsTestimonialDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const [testi, setTesti] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        setData(json);
        if (id === 'new') {
          setTesti({
            id: 'testi-' + Date.now(),
            name: '',
            photo: '',
            program: '',
            testimonial: '',
            rating: 5,
            job_title: '',
            company: ''
          });
        } else {
          const found = json.testimonialsData.find((p: any) => p.id === id);
          if (found) {
            setTesti({ ...found });
          }
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    const newData = { ...data };
    
    if (id === 'new') {
      newData.testimonialsData.push(testi);
    } else {
      const index = newData.testimonialsData.findIndex((p: any) => p.id === testi.id);
      if (index !== -1) {
        newData.testimonialsData[index] = testi;
      }
    }

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        router.push('/cms/testimonials');
      } else {
        alert('Gagal menyimpan perubahan.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    }
    setIsSaving(false);
  };

  if (!testi || !data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="w-full pb-20">
      <div className="mb-6">
        <Link href="/cms/testimonials" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Testimoni
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">
            {id === 'new' ? 'Tambah Testimoni Baru' : 'Edit Testimoni'}
          </h2>
          <p className="text-gray-500">Lengkapi detail informasi testimoni alumni.</p>
        </div>
        <div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Testimoni
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Alumni</label>
              <input 
                type="text" 
                value={testi.name} 
                onChange={e => setTesti({...testi, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan / Jabatan</label>
              <input 
                type="text" 
                value={testi.job_title} 
                onChange={e => setTesti({...testi, job_title: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Perusahaan</label>
              <input 
                type="text" 
                value={testi.company} 
                onChange={e => setTesti({...testi, company: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program yang Diikuti</label>
              <input 
                type="text" 
                value={testi.program} 
                onChange={e => setTesti({...testi, program: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto Profil</label>
              <ImageSelector 
                value={testi.photo} 
                onChange={(val) => setTesti({...testi, photo: val})} 
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Isi Testimoni</label>
            <textarea 
              value={testi.testimonial} 
              onChange={e => setTesti({...testi, testimonial: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black h-32 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
