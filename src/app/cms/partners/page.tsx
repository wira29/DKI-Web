'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, Edit2, Search } from 'lucide-react';
import Link from 'next/link';

export default function CmsPartners() {
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus mitra/teknologi ini?')) {
      const newData = { ...data };
      newData.partnersData = newData.partnersData.filter((p: any) => p.id !== id);
      setData(newData);

      // Silently save
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
    }
  };

  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  const filteredPartners = (data.partnersData || []).filter((p: any) => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">Mitra & Teknologi</h2>
          <p className="text-gray-500">Kelola daftar mitra dan teknologi yang tampil di halaman beranda.</p>
        </div>
        <div>
          <Link 
            href="/cms/partners/new"
            className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Baru
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari mitra / teknologi..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all text-sm bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama & Deskripsi</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Posisi Baris</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Icon & Warna</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPartners.length > 0 ? filteredPartners.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.row === 'TOP' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {item.row === 'TOP' ? 'Baris Atas' : 'Baris Bawah'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {item.logo ? (
                      <div className="flex items-center gap-2">
                        <img src={item.logo} alt={item.name} className="h-8 w-auto max-w-[80px] object-contain rounded" />
                        <span className="text-xs text-gray-400">Logo</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">{item.icon}</span>
                        <span className="text-xs text-gray-400">{item.color}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/cms/partners/${item.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    Belum ada data mitra/teknologi. Silakan tambah baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
