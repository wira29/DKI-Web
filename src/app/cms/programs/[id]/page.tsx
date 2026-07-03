'use client';

import { useState, useEffect, use } from 'react';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import WysiwygEditor from '@/components/admin/WysiwygEditor';
import ImageSelector from '@/components/admin/ImageSelector';

export default function CmsProgramDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const [prog, setProg] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        setData(json);
        if (id === 'new') {
          setProg({
            id: 'prog-' + Date.now(),
            title: '',
            short_description: '',
            image: '',
            duration: '',
            price: 0,
            discount_price: 0,
            badge: '',
            category: json.categoriesData?.[0]?.name || 'Uncategorized',
            level: 'Beginner'
          });
        } else {
          const found = json.programsData.find((p: any) => p.id === id);
          if (found) {
            setProg({ ...found });
          }
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    const newData = { ...data };
    
    if (id === 'new') {
      newData.programsData.push(prog);
    } else {
      const index = newData.programsData.findIndex((p: any) => p.id === prog.id);
      if (index !== -1) {
        newData.programsData[index] = prog;
      }
    }

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        router.push('/cms/programs');
      } else {
        alert('Gagal menyimpan perubahan.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    }
    setIsSaving(false);
  };

  if (!prog || !data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="w-full pb-20">
      <div className="mb-6">
        <Link href="/cms/programs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Program
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">
            {id === 'new' ? 'Tambah Program Baru' : 'Edit Program'}
          </h2>
          <p className="text-gray-500">Lengkapi detail informasi program pelatihan.</p>
        </div>
        <div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Program
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Program</label>
            <input 
              type="text" 
              value={prog.title} 
              onChange={e => setProg({...prog, title: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi (WYSIWYG)</label>
            <WysiwygEditor 
              value={prog.short_description} 
              onChange={(val) => setProg({...prog, short_description: val})} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
            <ImageSelector 
              value={prog.image} 
              onChange={(val) => setProg({...prog, image: val})} 
            />
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select 
                value={prog.category} 
                onChange={e => setProg({...prog, category: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black bg-white"
              >
                {data.categoriesData?.map((cat: any) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                <input 
                  type="number" 
                  value={prog.price} 
                  onChange={e => setProg({...prog, price: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harga Diskon (Opsional)</label>
                <input 
                  type="number" 
                  value={prog.discount_price || ''} 
                  onChange={e => setProg({...prog, discount_price: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durasi</label>
                <input 
                  type="text" 
                  value={prog.duration} 
                  onChange={e => setProg({...prog, duration: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <input 
                  type="text" 
                  value={prog.level} 
                  onChange={e => setProg({...prog, level: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge (Opsional)</label>
                <input 
                  type="text" 
                  value={prog.badge || ''} 
                  onChange={e => setProg({...prog, badge: e.target.value})}
                  placeholder="e.g. Best Seller"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
