'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';

export default function CmsCategories() {
  const [data, setData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => setData(json))
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

  const handleAdd = () => {
    const newData = { ...data };
    if (!newData.categoriesData) newData.categoriesData = [];
    
    newData.categoriesData.push({
      id: 'cat-' + Date.now(),
      name: 'Kategori Baru',
      type: 'KURSUS'
    });
    setData(newData);
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus kategori ini? (Pastikan tidak ada program yang menggunakannya)')) {
      const newData = { ...data };
      newData.categoriesData = newData.categoriesData.filter((p: any) => p.id !== id);
      setData(newData);
    }
  };

  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="w-full pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">Kategori</h2>
          <p className="text-gray-500">Kelola daftar kategori dinamis untuk program pelatihan dan sertifikasi.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleAdd}
            className="bg-white border border-gray-200 text-black px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Kategori
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Perubahan
          </button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-8 text-sm font-medium ${message.includes('berhasil') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID Kategori</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Nama Kategori</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Jenis</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.categoriesData && data.categoriesData.map((cat: any, index: number) => (
              <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-500">{cat.id}</td>
                <td className="px-6 py-4">
                  <input 
                    type="text" 
                    value={cat.name} 
                    onChange={e => {
                      const newData = { ...data };
                      newData.categoriesData[index].name = e.target.value;
                      setData(newData);
                    }}
                    placeholder="Nama Kategori"
                    className="w-full max-w-sm px-4 py-2 rounded-lg border border-gray-200 font-medium text-black text-sm outline-none focus:border-black"
                  />
                </td>
                <td className="px-6 py-4">
                  <select
                    value={cat.type || 'KURSUS'}
                    onChange={e => {
                      const newData = { ...data };
                      newData.categoriesData[index].type = e.target.value;
                      setData(newData);
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-black text-black bg-white"
                  >
                    <option value="KURSUS">Lembaga Kursus</option>
                    <option value="PELATIHAN_KERJA">Lembaga Pelatihan Kerja</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-block"
                    title="Hapus"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {(!data.categoriesData || data.categoriesData.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 bg-white">
                  Belum ada kategori. Klik "Tambah Kategori" untuk mulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
