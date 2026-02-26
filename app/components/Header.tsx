'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Search, Bell, ChevronDown, User, 
  Settings, LogOut, Sparkles, Zap, Ghost, Pizza, Coffee
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info';
  timestamp: string;
  unread: boolean;
}

export default function SovereignHeader({ module: _module }: { module?: string }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Money Printer Go Brrr',
      message: 'March payroll cycle has been verified. Everyone is getting paid (yay!).',
      type: 'success',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      title: 'Emergency: Low Vibes',
      message: 'The Sales department has gone 4 hours without a high-five. Critical levels.',
      type: 'warning',
      timestamp: '5 hours ago',
      unread: true
    }
  ]);

  // Handle scroll and click-outside logic (keeping your robust implementation!)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setShowUserMenu(false);
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setShowNotifications(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-700 ${
      scrolled 
        ? 'bg-white/70 backdrop-blur-md border-b border-fuchsia-200 shadow-[0_10px_30px_-10px_rgba(186,103,255,0.2)]' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      
      {/* Decorative background "Ghost" elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 -right-10 w-64 h-64 bg-fuchsia-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-400 mx-auto flex items-center justify-between px-6 h-20 gap-4">
        
        {/* Left: The "Vibe" Brand */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <Zap size={22} className="text-white fill-current animate-bounce" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-lg shadow-md flex items-center justify-center">
              <Sparkles size={12} className="text-amber-400 animate-spin-slow" />
            </div>
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-black tracking-widest bg-linear-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text uppercase italic">
              Sovereign HQ
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-tighter group-hover:text-cyan-500 transition-colors">
              unleash the kraken (politely)
            </span>
          </div>
        </div>

        {/* Center: The "Brain" Search */}
        <div className="flex-1 max-w-xl group">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-violet-400 to-fuchsia-400 rounded-full blur opacity-0 group-focus-within:opacity-20 transition-opacity pointer-events-none" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-fuchsia-500 group-focus-within:scale-110 transition-all pointer-events-none" />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for magic, employees, or pizza..."
              className="w-full bg-white/50 border-2 border-slate-100 rounded-full text-sm font-medium pl-12 pr-4 py-3 focus:bg-white focus:border-fuchsia-300 outline-none transition-all shadow-inner placeholder:text-slate-300"
            />
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-400">
              ⌘ K
            </kbd>
          </div>
        </div>

        {/* Right: The Chaos Control */}
        <div className="flex items-center gap-2">
          
          <button className="hidden md:flex p-3 rounded-2xl text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-all hover:rotate-12">
            <Coffee size={20} />
          </button>

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-3 rounded-2xl transition-all relative ${
                showNotifications ? 'bg-fuchsia-100 text-fuchsia-600 rotate-12' : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-white animate-ping" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-pink-600 rounded-full border-2 border-white" />
            </button>

            {/* Notifications Panel with a little extra flair */}
            {showNotifications && (
              <div className="absolute right-0 mt-4 w-96 bg-white rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden animate-in slide-in-from-top-4 duration-300">
                <div className="px-6 py-5 bg-linear-to-r from-indigo-50 to-fuchsia-50 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                    <Pizza size={14} className="text-orange-500" /> Recent Drama
                  </h3>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline">Clear the chaos</button>
                </div>
                <div className="max-h-96 overflow-y-auto p-2">
                  {notifications.map(notif => (
                    <div key={notif.id} className="group p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
                      <div className="flex gap-4">
                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notif.unread ? 'bg-fuchsia-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-slate-200'}`} />
                        <div className="space-y-1">
                          <p className="text-[11px] font-black text-slate-700 uppercase">{notif.title}</p>
                          <p className="text-xs text-slate-500 leading-relaxed italic">"{notif.message}"</p>
                          <p className="text-[9px] font-bold text-indigo-300 uppercase pt-1">{notif.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="group flex items-center gap-3 pl-1 pr-3 py-1 rounded-full bg-slate-50 hover:bg-indigo-50 border border-slate-200 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-amber-400 to-rose-400 flex items-center justify-center border-2 border-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} 
                  alt="avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-[10px] font-black text-slate-700 uppercase leading-none">
                  {(user?.full_name ?? 'Guest User').toUpperCase()}
                </span>
                <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-tighter">{user?.company_slug ?? 'NO COMPANY'}</span>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-3 animate-in fade-in zoom-in-95">
                <div className="space-y-1">
                  <MenuButton icon={<User size={16}/>} label="My Kingdom" />
                  <MenuButton icon={<Settings size={16}/>} label="The Lab" />
                  <div className="h-px bg-slate-100 my-2 mx-2" />
                  <MenuButton 
                    icon={<LogOut size={16}/>} 
                    label="Escape Hatch" 
                    variant="danger" 
                    onClick={() => {
                      void logout();
                      setShowUserMenu(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuButton({ icon, label, variant = 'default', onClick }: { icon: React.ReactNode; label: string, variant?: 'default' | 'danger'; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${
      variant === 'danger' ? 'hover:bg-rose-50 text-rose-500' : 'hover:bg-indigo-50 text-slate-600 hover:text-indigo-600'
    }`}>
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
