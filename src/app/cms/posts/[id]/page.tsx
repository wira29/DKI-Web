'use client';

import { useState, useEffect, use } from 'react';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import WysiwygEditor from '@/components/admin/WysiwygEditor';
import ImageSelector from '@/components/admin/ImageSelector';

export default function CmsPostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(json => {
        setData(json);
        if (id === 'new') {
          setPost({
            id: 'post-' + Date.now(),
            title: '',
            short_description: '',
            image: '',
            published_at: new Date().toISOString(),
            type: 'BERITA'
          });
        } else {
          const found = json.postsData.find((p: any) => p.id === id);
          if (found) {
            setPost({ ...found });
          }
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    // Ensure we create a new array so we don't mutate the existing state directly
    const newData = { ...data, postsData: [...data.postsData] };
    
    if (id === 'new') {
      const existingIndex = newData.postsData.findIndex((p: any) => p.id === post.id);
      if (existingIndex !== -1) {
        newData.postsData[existingIndex] = post;
      } else {
        newData.postsData.push(post);
      }
    } else {
      const index = newData.postsData.findIndex((p: any) => p.id === post.id);
      if (index !== -1) {
        newData.postsData[index] = post;
      }
    }

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (res.ok) {
        router.push('/cms/posts');
      } else {
        alert('Gagal menyimpan perubahan.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    }
    setIsSaving(false);
  };

  if (!post || !data) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="w-full pb-20">
      <div className="mb-6">
        <Link href="/cms/posts" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Artikel & Berita
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black tracking-tight mb-2">
            {id === 'new' ? 'Tambah Artikel / Berita Baru' : 'Edit Artikel / Berita'}
          </h2>
          <p className="text-gray-500">Lengkapi detail informasi artikel atau berita.</p>
        </div>
        <div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Data
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel / Berita</label>
            <input 
              type="text" 
              value={post.title} 
              onChange={e => setPost({...post, title: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi (WYSIWYG)</label>
            <WysiwygEditor 
              value={post.short_description} 
              onChange={(val) => setPost({...post, short_description: val})} 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
            <ImageSelector 
              value={post.image} 
              onChange={(val) => setPost({...post, image: val})} 
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Konten</label>
            <select 
              value={post.type || 'BERITA'} 
              onChange={e => setPost({...post, type: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black bg-white"
            >
              <option value="BERITA">Berita</option>
              <option value="ARTIKEL">Artikel</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Terbit (ISO String)</label>
            <input 
              type="text" 
              value={post.published_at || ''} 
              onChange={e => setPost({...post, published_at: e.target.value})}
              placeholder="2026-08-15T09:00:00Z"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
