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
        if (!json.heroStoryFrames || json.heroStoryFrames.length === 0) {
          json.heroStoryFrames = [{ title: '', subtitle: '', tagline: '', image: '', type: 'image' }];
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
    <div className="w-full pb-20 bg-[#FAFAFA] min-h-screen font-sans">
      <div className="flex justify-between items-center mb-10 sticky top-16 z-20 bg-primary/95 backdrop-blur-md py-6 -mx-8 px-8 border-b border-white/10 shadow-2xl overflow-hidden">
        {/* Subtle background effects for header */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <h2 className="text-2xl font-bold text-white tracking-tight relative z-10 flex items-center gap-3">
          <span className="w-2 h-8 bg-blue-400 rounded-full inline-block"></span>
          Pengaturan Beranda
        </h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="relative z-10 bg-white text-primary px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-black/20"
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
      <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 mb-12">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Hero Section</h3>
        </div>
        
        <div className="space-y-8">
          {data.heroStoryFrames && data.heroStoryFrames.length > 0 && (
            <div className="grid grid-cols-1 gap-6 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline (Label Atas)</label>
                <input 
                  type="text" 
                  value={data.heroStoryFrames[0].tagline || ''} 
                  onChange={e => {
                    const newData = { ...data };
                    newData.heroStoryFrames[0].tagline = e.target.value;
                    setData(newData);
                  }}
                  placeholder="Contoh: EKOSISTEM BELAJAR DEVELOPER"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-black bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Utama</label>
                <input 
                  type="text" 
                  value={data.heroStoryFrames[0].title} 
                  onChange={e => {
                    const newData = { ...data };
                    newData.heroStoryFrames[0].title = e.target.value;
                    setData(newData);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-black bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sub Judul / Deskripsi</label>
                <textarea 
                  value={data.heroStoryFrames[0].subtitle} 
                  onChange={e => {
                    const newData = { ...data };
                    newData.heroStoryFrames[0].subtitle = e.target.value;
                    setData(newData);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm h-28 text-black bg-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gambar Banner</label>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <ImageSelector 
                    value={data.heroStoryFrames[0].image} 
                    onChange={val => {
                      const newData = { ...data };
                      newData.heroStoryFrames[0].image = val;
                      setData(newData);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hero Features Section */}
      <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 mb-12">
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Fitur Hero (Cards)</h3>
          </div>
          <button 
            onClick={() => {
              const newData = { ...data };
              if (!newData.heroFeaturesData) newData.heroFeaturesData = [];
              newData.heroFeaturesData.push({ title: 'Fitur Baru', icon: 'CheckCircle', link: '#' });
              setData(newData);
            }}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Tambah Fitur
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.heroFeaturesData?.map((feature: any, index: number) => (
            <div key={index} className="p-6 bg-gray-50/50 rounded-2xl border border-gray-200 relative group">
              <button 
                onClick={() => {
                  const newData = { ...data };
                  newData.heroFeaturesData.splice(index, 1);
                  setData(newData);
                }}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title="Hapus Fitur"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Judul Card</label>
                  <input 
                    type="text" 
                    value={feature.title} 
                    onChange={e => {
                      const newData = { ...data };
                      newData.heroFeaturesData[index].title = e.target.value;
                      setData(newData);
                    }}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-black bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Ikon (Lucide)</label>
                    <input 
                      type="text" 
                      value={feature.icon} 
                      onChange={e => {
                        const newData = { ...data };
                        newData.heroFeaturesData[index].icon = e.target.value;
                        setData(newData);
                      }}
                      placeholder="Contoh: BookOpen"
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-black bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">URL Tautan</label>
                    <input 
                      type="text" 
                      value={feature.link} 
                      onChange={e => {
                        const newData = { ...data };
                        newData.heroFeaturesData[index].link = e.target.value;
                        setData(newData);
                      }}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-black bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500">*Untuk referensi nama ikon, silakan lihat situs <a href="https://lucide.dev/icons" target="_blank" className="text-blue-600 hover:underline">Lucide Icons</a> (misal: BookOpen, Briefcase, Award).</p>
      </section>

      {/* About Section */}
      <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 mb-12">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">About Section</h3>
        </div>
        
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Struktur Organisasi (Gambar)</label>
            <ImageSelector 
              value={data.aboutData.org_structure_image || ''} 
              onChange={val => setData({...data, aboutData: {...data.aboutData, org_structure_image: val}})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filosofi Logo (WYSIWYG)</label>
            <WysiwygEditor 
              value={data.aboutData.logo_philosophy || ''} 
              onChange={(val) => setData({...data, aboutData: {...data.aboutData, logo_philosophy: val}})} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Penggunaan Logo (WYSIWYG)</label>
            <WysiwygEditor 
              value={data.aboutData.logo_usage || ''} 
              onChange={(val) => setData({...data, aboutData: {...data.aboutData, logo_usage: val}})} 
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
      <section className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Footer Section</h3>
        </div>
        
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
