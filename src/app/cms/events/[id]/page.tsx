'use client';

import { useState, useEffect, use } from 'react';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import WysiwygEditor from '@/components/admin/WysiwygEditor';
import ImageSelector from '@/components/admin/ImageSelector';

export default function CmsEventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const [ev, setEv] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        setData(json);
        if (id === 'new') {
          setEv({
            id: 'event-' + Date.now(),
            title: '',
            short_description: '',
            image: '',
            event_date: new Date().toISOString(),
            location_type: 'Online',
            status: 'Upcoming',
            type: 'EVENT'
          });
        } else {
          const found = json.eventsData.find((p: any) => p.id === id);
          if (found) {
            setEv({ ...found });
          }
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    // Ensure we create a new array so we don't mutate the existing state directly
    const newData = { ...data, eventsData: [...data.eventsData] };
    
    if (id === 'new') {
      const existingIndex = newData.eventsData.findIndex((p: any) => p.id === ev.id);
      if (existingIndex !== -1) {
        newData.eventsData[existingIndex] = ev;
      } else {
        newData.eventsData.push(ev);
      }
    } else {
      const index = newData.eventsData.findIndex((p: any) => p.id === ev.id);
      if (index !== -1) {
        newData.eventsData[index] = ev;
      }
    }

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        router.push('/cms/events');
      } else {
        alert('Gagal menyimpan perubahan.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    }
    setIsSaving(false);
  };

  if (!ev || !data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="w-full pb-20">
      <div className="mb-6">
        <Link href="/cms/events" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Acara
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">
            {id === 'new' ? 'Tambah Acara Baru' : 'Edit Acara'}
          </h2>
          <p className="text-gray-500">Lengkapi detail informasi acara atau artikel.</p>
        </div>
        <div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Acara
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Acara</label>
            <input 
              type="text" 
              value={ev.title} 
              onChange={e => setEv({...ev, title: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi (WYSIWYG)</label>
            <WysiwygEditor 
              value={ev.short_description} 
              onChange={(val) => setEv({...ev, short_description: val})} 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Acara</label>
            <ImageSelector 
              value={ev.image} 
              onChange={(val) => setEv({...ev, image: val})} 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Konten</label>
            <select 
              value={ev.type || 'EVENT'} 
              onChange={e => setEv({...ev, type: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black bg-white"
            >
              <option value="EVENT">Acara (Memiliki Jadwal & Lokasi)</option>
              <option value="ARTICLE">Artikel / Berita</option>
            </select>
          </div>

          {(ev.type === 'EVENT' || !ev.type) && (
            <>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Lokasi</label>
                  <select 
                    value={ev.location_type || 'Online'} 
                    onChange={e => setEv({...ev, location_type: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black bg-white"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal & Waktu (ISO String)</label>
                  <input 
                    type="text" 
                    value={ev.event_date || ''} 
                    onChange={e => setEv({...ev, event_date: e.target.value})}
                    placeholder="2026-08-15T09:00:00Z"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={ev.status || 'Upcoming'} 
                    onChange={e => setEv({...ev, status: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black bg-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
