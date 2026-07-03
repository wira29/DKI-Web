'use client';
import { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Link as LinkIcon, Upload, Loader2 } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function ImageSelector({ value, onChange }: Props) {
  const [mode, setMode] = useState<'url' | 'gallery'>('url');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'gallery') {
      loadImages();
    }
  }, [mode]);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      if (data.images) setImages(data.images);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
        loadImages(); // refresh list
      }
    } catch (err) {
      console.error(err);
      alert('Gagal mengupload gambar');
    }
    setIsUploading(false);
  };

  const handleDelete = async (e: React.MouseEvent, imgUrl: string) => {
    e.stopPropagation();
    if (!confirm('Yakin ingin menghapus gambar ini?')) return;
    
    const filename = imgUrl.split('/').pop();
    if (!filename) return;

    try {
      const res = await fetch(`/api/images?filename=${filename}`, { method: 'DELETE' });
      if (res.ok) {
        if (value === imgUrl) onChange('');
        loadImages();
      } else {
        alert('Gagal menghapus gambar');
      }
    } catch (err) {
      console.error('Failed to delete', err);
      alert('Terjadi kesalahan jaringan');
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="flex border-b border-gray-200 bg-gray-50 p-1 gap-1">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-colors ${mode === 'url' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
        >
          <LinkIcon className="w-4 h-4" /> URL Eksternal
        </button>
        <button
          type="button"
          onClick={() => setMode('gallery')}
          className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-colors ${mode === 'gallery' ? 'bg-white text-black shadow-sm border border-gray-200' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
        >
          <ImageIcon className="w-4 h-4" /> Galeri Lokal
        </button>
      </div>

      <div className="p-4">
        {mode === 'url' ? (
          <div>
            <input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm text-black"
            />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Pilih gambar dari folder public</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-black text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50"
              >
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Upload
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-64 overflow-y-auto p-1 custom-scrollbar">
                {images.map((img) => (
                  <div key={img} className={`relative group aspect-square rounded-xl overflow-hidden border-2 transition-all ${value === img ? 'border-black ring-2 ring-gray-200' : 'border-gray-100 hover:border-gray-300'}`}>
                    <button
                      type="button"
                      onClick={() => onChange(img)}
                      className="w-full h-full"
                    >
                      <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => handleDelete(e, img)}
                      className="absolute top-1.5 right-1.5 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                      title="Hapus gambar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                ))}
                {images.length === 0 && (
                  <div className="col-span-full text-center py-8 text-sm text-gray-500">
                    Tidak ada gambar di folder public
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {value && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Preview</span>
            <div className="rounded-xl overflow-hidden bg-gray-50 h-32 w-full max-w-sm">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
