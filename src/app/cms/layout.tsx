'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, Award, MessageSquare, Calendar, LogOut, Tags, Newspaper } from 'lucide-react';
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

  const navGroups = [
    {
      group: 'Pengaturan Umum',
      items: [
        { name: 'Beranda & Hero', href: '/cms', icon: LayoutDashboard },
        { name: 'Mitra & Teknologi', href: '/cms/partners', icon: LayoutDashboard },
      ]
    },
    {
      group: 'Program & Kelas',
      items: [
        { name: 'Program Pelatihan', href: '/cms/programs', icon: BookOpen },
        { name: 'Sertifikasi BNSP', href: '/cms/certifications', icon: Award },
        { name: 'Kategori', href: '/cms/categories', icon: Tags },
      ]
    },
    {
      group: 'Konten & Interaksi',
      items: [
        { name: 'Artikel & Berita', href: '/cms/posts', icon: Newspaper },
        { name: 'Testimoni', href: '/cms/testimonials', icon: MessageSquare },
        { name: 'Pesan Masuk', href: '/cms/messages', icon: MessageSquare },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white fixed h-full z-40 overflow-y-auto border-r border-white/5 shadow-2xl">
        {/* Subtle grid background for premium feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
        
        <div className="h-20 flex items-center px-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">D</div>
            <span className="text-xl font-bold tracking-tight">DKI Admin</span>
          </div>
        </div>
        
        <div className="p-4 space-y-6 relative z-10 pb-24">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h3 className="px-4 text-[11px] font-bold text-white/60 uppercase tracking-wider mb-2">{group.group}</h3>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 border border-blue-500/30' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-primary z-10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-lg font-bold text-gray-800 tracking-tight">Dashboard Content Management</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
