'use client';
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', {
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          }
        });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        toast.error(data.error || 'Gagal mengirim pesan');
      }
    } catch (err) {
      setStatus('error');
      toast.error('Terjadi kesalahan jaringan.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input 
            type="text" 
            id="name"
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-black"
            placeholder="Masukkan nama Anda"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Lengkap</label>
          <input 
            type="email" 
            id="email"
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-black"
            placeholder="contoh@email.com"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subjek</label>
        <input 
          type="text" 
          id="subject"
          required
          value={formData.subject}
          onChange={e => setFormData({...formData, subject: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-black"
          placeholder="Subjek pesan"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">Pesan</label>
        <textarea 
          id="message" 
          required
          rows={5}
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-black"
          placeholder="Tuliskan pesan Anda secara detail..."
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 shadow-lg shadow-primary/30"
      >
        {status === 'loading' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : status === 'success' ? (
          'Terkirim'
        ) : (
          <>
            <Send className="w-5 h-5" />
            Kirim Pesan Sekarang
          </>
        )}
      </button>
    </form>
  );
}
