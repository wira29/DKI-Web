'use client';
import { useState, useEffect } from 'react';
import { Loader2, Trash2, Mail, Calendar } from 'lucide-react';

export default function CmsMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus pesan ini?')) {
      try {
        const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setMessages(messages.filter(m => m.id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="w-full pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">Pesan Masuk</h2>
          <p className="text-gray-500">Daftar pesan dari pengunjung website via Hubungi Kami.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden p-6 md:p-8">
        {messages.length > 0 ? (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{msg.subject}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-500 mt-1">
                        <span className="font-medium text-gray-700">{msg.name}</span>
                        <span className="hidden sm:inline">&bull;</span>
                        <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">{msg.email}</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-gray-400 bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(msg.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Hapus Pesan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="pl-0 md:pl-16">
                  <div className="p-4 bg-white rounded-xl border border-gray-100 text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Belum Ada Pesan</h3>
            <p className="text-gray-500">Pesan dari pengunjung akan muncul di sini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
