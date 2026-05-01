'use client';
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { usePathname } from 'next/navigation';

const NO_LAYOUT_PATHS = ['/', '/login'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

      {/* ── Arrow toggle: solo desktop, 100% inline styles, sin Tailwind ── */}
      {isDesktop && (
        <button
          onClick={() => setDesktopSidebarOpen(s => !s)}
          aria-label={desktopSidebarOpen ? 'Colapsar menú' : 'Expandir menú'}
          style={{
            position: 'fixed',
            top: '72px',
            left: desktopSidebarOpen ? '248px' : '0px',
            transition: 'left 300ms ease-in-out',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '52px',
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            cursor: 'pointer',
            boxShadow: '3px 0 12px rgba(79,70,229,0.5)',
            outline: 'none',
          }}
        >
          {desktopSidebarOpen
            ? <FiChevronLeft size={13} />
            : <FiChevronRight size={13} />}
        </button>
      )}

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
