'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, Edit2, Search } from 'lucide-react';
import Link from 'next/link';

export default function CmsEvents() {
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus acara ini?')) {
      const newData = { ...data };
      newData.eventsData = newData.eventsData.filter((p: any) => p.id !== id);
      setData(newData);

      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
    }
  };

  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  const filteredEvents = data.eventsData.filter((ev: any) => 
    ev.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">Artikel & Acara</h2>
          <p className="text-gray-500">Kelola daftar acara dan berita terbaru.</p>
        </div>
        <div>
          <Link 
            href="/cms/events/new"
            className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Baru
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari judul acara..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-black text-black"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Judul Acara</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Tipe Lokasi</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredEvents.map((ev: any) => (
              <tr key={ev.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={ev.image} alt={ev.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                    <div>
                      <div className="font-medium text-black">{ev.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-xs">{ev.short_description.replace(/<[^>]+>/g, '')}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    ev.location_type === 'Online' ? 'bg-blue-50 text-blue-700' :
                    ev.location_type === 'Offline' ? 'bg-orange-50 text-orange-700' :
                    'bg-purple-50 text-purple-700'
                  }`}>
                    {ev.location_type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    ev.status === 'Upcoming' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {ev.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/cms/events/${ev.id}`}
                      className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors inline-block"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(ev.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-block"
                      title="Hapus"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEvents.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 bg-white">
                  Tidak ada acara yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
