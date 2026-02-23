'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Menu, X } from 'lucide-react';

export default function HRMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-[linear-gradient(180deg,#f8fbff,#f4f0ff,#eff9ff)] overflow-hidden font-sans antialiased text-[rgb(47,42,67)]">
      
      {/* 1. Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[rgba(36,37,44,0.35)] backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Desktop Sidebar - Direct */}
      <div className="hidden lg:flex">
        <Sidebar module="hrms" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-[rgb(255,255,255)] border-r border-[rgb(235,237,242)] lg:hidden">
          <div className="flex flex-col h-full">
            <div className="h-16 flex items-center px-4 border-b border-[rgb(235,237,242)]">
              <button 
                className="ml-auto p-2 text-[rgb(142,144,150)] hover:text-[rgb(84,87,98)]"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <Sidebar module="hrms" />
            </div>
          </div>
        </aside>
      )}

      {/* 3. Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Integrated Header */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 bg-[rgba(255,255,255,0.92)] backdrop-blur-md border-b border-[rgb(235,237,242)] sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 lg:hidden text-[rgb(108,112,122)] hover:bg-[rgb(248,248,250)] rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          <Header module="hrms" />
        </header>

        {/* 4. Page Content with Max-Width Constraint */}
        <main className="flex-1 overflow-y-auto bg-[linear-gradient(180deg,#f8fbff,#f4f0ff,#eff9ff)]">
          <div className="max-w-400 mx-auto min-h-full">
            {children}
          </div>
          
          {/* Subtle Footer for Context */}
          <footer className="px-10 py-6 border-t border-[rgb(235,237,242)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[rgb(108,112,122)] text-xs font-medium">
            <p>© 2026 HRCORE Systems. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[rgb(63,81,181)]">Privacy Policy</a>
              <a href="#" className="hover:text-[rgb(63,81,181)]">Help Center</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}