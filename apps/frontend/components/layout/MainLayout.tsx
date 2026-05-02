'use client';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { usePathname } from 'next/navigation';

const NO_LAYOUT_PATHS = ['/', '/login'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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

  const close = () => {
    setOpen(false);
    localStorage.setItem('sb_open', '0');
  };

  if (NO_LAYOUT_PATHS.includes(pathname)) return <>{children}</>;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f1117 0%, #141824 50%, #0f1117 100%)' }}>

      {/* Sidebar — posición fija, se oculta con transform cuando cerrada */}
      <Sidebar open={open} onToggle={toggle} />

      {/* Overlay oscuro — SOLO cuando sidebar está abierta. Cierra al hacer click. */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 39,
            cursor: 'pointer',
          }}
        />
      )}

      {/* Contenido principal — siempre ocupa el 100% del ancho */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <Topbar onToggle={toggle} />
        <main>{children}</main>
      </div>
    </div>
  );
}

