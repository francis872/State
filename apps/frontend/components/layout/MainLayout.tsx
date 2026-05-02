'use client';
import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { usePathname } from 'next/navigation';

const NO_LAYOUT_PATHS = ['/', '/login'];
const STORAGE_KEY = 'stateos_sidebar_open';
const SIDEBAR_W = 256;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Detect desktop
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Load persisted state
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) setSidebarOpen(saved === 'true');
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    localStorage.setItem(STORAGE_KEY, 'false');
  }, []);

  if (NO_LAYOUT_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div
      data-sidebar={sidebarOpen ? 'open' : 'closed'}
      style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0f1117 0%, #141824 50%, #0f1117 100%)' }}
    >

      {/* Mobile backdrop */}
      <div
        onClick={closeSidebar}
        style={{
          display: (!isDesktop && sidebarOpen) ? 'block' : 'none',
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        }}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isDesktop={isDesktop}
        onClose={closeSidebar}
      />

      {/* Floating toggle button — desktop only */}
      <button
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? 'Colapsar menú' : 'Expandir menú'}
        className="sidebar-toggle sidebar-toggle-btn"
        style={{
          display: isDesktop ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: '84px',
          zIndex: 9999,
          width: '24px',
          height: '56px',
          background: '#4f46e5',
          color: '#fff',
          border: 'none',
          borderRadius: '0 10px 10px 0',
          cursor: 'pointer',
          boxShadow: '4px 0 20px rgba(79,70,229,0.5)',
        }}
      >
        {sidebarOpen ? <FiChevronLeft size={15} /> : <FiChevronRight size={15} />}
      </button>

      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
      }}>
        <Topbar onToggle={toggleSidebar} isDesktop={isDesktop} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
