'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, Award, MessageSquare, Calendar, LogOut, Tags } from 'lucide-react';
import Cookies from 'js-cookie';

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Do not render sidebar on login page
  if (pathname === '/cms/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    Cookies.remove('dki_admin_token');
    router.push('/cms/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Pengaturan Beranda', href: '/cms', icon: LayoutDashboard },
    { name: 'Program Pelatihan', href: '/cms/programs', icon: BookOpen },
    { name: 'Sertifikasi', href: '/cms/certifications', icon: Award },
    { name: 'Kategori', href: '/cms/categories', icon: Tags },
    { name: 'Testimoni', href: '/cms/testimonials', icon: MessageSquare },
    { name: 'Artikel & Acara', href: '/cms/events', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white fixed h-full z-40">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <span className="text-xl font-bold tracking-tight">DKI Admin</span>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-white/10 text-white font-medium' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="h-16 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-30">
          <h1 className="text-lg font-semibold text-black tracking-tight">Dashboard Content Management</h1>
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
