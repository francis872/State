'use client';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { usePathname } from 'next/navigation';

const NO_LAYOUT_PATHS = ['/', '/login'];
const SIDEBAR_W = 256;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('sb_open');
    if (saved !== null) setOpen(saved === '1');
  }, []);

  const toggle = () => {
    setOpen(prev => {
      const next = !prev;
      localStorage.setItem('sb_open', next ? '1' : '0');
      return next;
    });
  };

  if (NO_LAYOUT_PATHS.includes(pathname)) return <>{children}</>;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f1117 0%, #141824 50%, #0f1117 100%)' }}>
      {/* Sidebar always fixed — slides in/out via transform */}
      <Sidebar open={open} onToggle={toggle} />

      {/* Content shifts right via marginLeft */}
      <div style={{
        marginLeft: `${open ? SIDEBAR_W : 0}px`,
        transition: 'margin-left 300ms ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <Topbar onToggle={toggle} />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

