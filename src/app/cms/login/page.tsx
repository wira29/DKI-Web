'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check email and password for superadmin role
    if (email === 'superadmin@dki.com' && password === 'password') {
      Cookies.set('dki_admin_token', 'authenticated-super-secret-token', { expires: 1 }); // expires in 1 day
      router.push('/cms');
      router.refresh(); // force middleware to re-evaluate
    } else {
      setError('Email atau Password salah. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-black mb-2 tracking-tight">Login CMS</h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Masukkan kredensial Anda untuk mengakses dasbor admin.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-black"
              placeholder="admin@dki.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-black"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-70"
          >
            {isLoading ? 'Memeriksa...' : 'Masuk Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
