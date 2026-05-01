'use client';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { usePathname } from 'next/navigation';

const NO_LAYOUT_PATHS = ['/', '/login'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  if (NO_LAYOUT_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1117] via-[#141824] to-[#0f1117] flex">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <Sidebar
        mobileOpen={mobileSidebarOpen}
        desktopOpen={desktopSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* ── Floating arrow toggle — desktop only, sticks to sidebar edge ── */}
      <button
        onClick={() => setDesktopSidebarOpen(s => !s)}
        aria-label={desktopSidebarOpen ? 'Colapsar menú' : 'Expandir menú'}
        style={{
          position: 'fixed',
          top: '72px',
          left: desktopSidebarOpen ? '248px' : '0px',
          transition: 'left 300ms ease-in-out',
          zIndex: 60,
        }}
        className="sidebar-toggle items-center justify-center w-6 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-r-lg"
      >
        {desktopSidebarOpen
          ? <FiChevronLeft size={14} />
          : <FiChevronRight size={14} />}
      </button>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onMobileMenuToggle={() => setMobileSidebarOpen(s => !s)}
          onDesktopMenuToggle={() => setDesktopSidebarOpen(s => !s)}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
