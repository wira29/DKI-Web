'use client';

import { useState, useEffect } from 'react';
import WysiwygEditor from '@/components/admin/WysiwygEditor';
import ImageSelector from '@/components/admin/ImageSelector';
import { Save, Loader2 } from 'lucide-react';

export default function CmsDashboard() {
  const [data, setData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(json => {
        if (!json.footerData) {
          json.footerData = { description: '', address: '', email: '', phone: '' };
        }
        setData(json);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setMessage('Perubahan berhasil disimpan!');
      } else {
        setMessage('Gagal menyimpan perubahan.');
      }
    } catch (err) {
      setMessage('Terjadi kesalahan jaringan.');
    }
    setIsSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="w-full pb-20">
      <div className="flex justify-between items-center mb-8 sticky top-16 z-20 bg-gray-50/90 backdrop-blur-sm py-4 -mx-8 px-8 border-b border-gray-200 shadow-sm">
        <h2 className="text-3xl font-semibold text-black tracking-tight">Pengaturan Beranda</h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Simpan Perubahan
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-8 text-sm font-medium ${message.includes('berhasil') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message}
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-10">
        <h3 className="text-xl font-semibold text-black mb-6 border-b border-gray-100 pb-4">Hero Section (Slides)</h3>
        <div className="space-y-8">
          {data.heroStoryFrames.map((frame: any, index: number) => (
            <div key={frame.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative">
              <div className="absolute top-4 right-4 text-xs font-semibold text-gray-400">Slide {index + 1}</div>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Utama</label>
                  <input 
                    type="text" 
                    value={frame.title} 
                    onChange={e => {
                      const newData = { ...data };
                      newData.heroStoryFrames[index].title = e.target.value;
                      setData(newData);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Judul</label>
                  <textarea 
                    value={frame.subtitle} 
                    onChange={e => {
                      const newData = { ...data };
                      newData.heroStoryFrames[index].subtitle = e.target.value;
                      setData(newData);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm h-24 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                  <ImageSelector 
                    value={frame.image} 
                    onChange={val => {
                      const newData = { ...data };
                      newData.heroStoryFrames[index].image = val;
                      setData(newData);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-semibold text-black mb-6 border-b border-gray-100 pb-4">About Section</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul About</label>
            <input 
              type="text" 
              value={data.aboutData.title} 
              onChange={e => setData({...data, aboutData: {...data.aboutData, title: e.target.value}})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar About</label>
            <ImageSelector 
              value={data.aboutData.image} 
              onChange={val => setData({...data, aboutData: {...data.aboutData, image: val}})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi (WYSIWYG)</label>
            <WysiwygEditor 
              value={data.aboutData.description} 
              onChange={(val) => setData({...data, aboutData: {...data.aboutData, description: val}})} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Visi</label>
            <textarea 
              value={data.aboutData.vision} 
              onChange={e => setData({...data, aboutData: {...data.aboutData, vision: e.target.value}})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm h-24 text-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Statistik Data</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.aboutData.stats.map((stat: any, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <input 
                    type="text" 
                    value={stat.label} 
                    onChange={e => {
                      const newData = { ...data };
                      newData.aboutData.stats[index].label = e.target.value;
                      setData(newData);
                    }}
                    placeholder="Label (e.g. Alumni)"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 mb-2 text-sm outline-none focus:border-black text-black"
                  />
                  <input 
                    type="text" 
                    value={stat.value} 
                    onChange={e => {
                      const newData = { ...data };
                      newData.aboutData.stats[index].value = e.target.value;
                      setData(newData);
                    }}
                    placeholder="Nilai (e.g. 5000+)"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-black text-black"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-semibold text-black mb-6 border-b border-gray-100 pb-4">Footer Section</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
            <textarea 
              value={data.footerData.description} 
              onChange={e => setData({...data, footerData: {...data.footerData, description: e.target.value}})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm h-24 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
            <textarea 
              value={data.footerData.address} 
              onChange={e => setData({...data, footerData: {...data.footerData, address: e.target.value}})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm h-24 text-black"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={data.footerData.email} 
                onChange={e => setData({...data, footerData: {...data.footerData, email: e.target.value}})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
              <input 
                type="text" 
                value={data.footerData.phone} 
                onChange={e => setData({...data, footerData: {...data.footerData, phone: e.target.value}})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
