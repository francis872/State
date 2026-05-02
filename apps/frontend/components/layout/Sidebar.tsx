'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiUsers, FiTrello, FiMail, FiBarChart2, FiSettings, FiCreditCard, FiHome, FiZap, FiChevronsLeft } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard',   href: '/dashboard',  icon: <FiGrid size={18} /> },
  { label: 'Analytics',   href: '/analytics',  icon: <FiBarChart2 size={18} /> },
  { label: 'Pipeline',    href: '/pipeline',   icon: <FiTrello size={18} /> },
  { label: 'Contactos',   href: '/contacts',   icon: <FiUsers size={18} /> },
  { label: 'Propiedades', href: '/properties', icon: <FiHome size={18} /> },
  { label: 'AI Score',    href: '/ai-score',   icon: <FiZap size={18} /> },
  { label: 'Inbox',       href: '/inbox',      icon: <FiMail size={18} /> },
  { label: 'Facturación', href: '/billing',    icon: <FiCreditCard size={18} /> },
  { label: 'Ajustes',     href: '/settings',   icon: <FiSettings size={18} /> },
];

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '256px',
      zIndex: 40,
      transform: open ? 'translateX(0)' : 'translateX(-256px)',
      transition: 'transform 300ms ease-in-out',
      /* CRÍTICO: cuando está cerrada no captura ningún click */
      pointerEvents: open ? 'auto' : 'none',
      background: '#0d0f1a',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      boxShadow: open ? '4px 0 30px rgba(0,0,0,0.5)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
        flexShrink: 0, height: '64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #9333ea)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: '11px' }}>S</span>
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>STATE OS</span>
        </div>
        <button onClick={onToggle} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '30px', height: '30px', borderRadius: '8px',
          border: 'none', background: 'rgba(255,255,255,0.07)',
          color: '#94a3b8', cursor: 'pointer', flexShrink: 0,
        }}>
          <FiChevronsLeft size={16} />
        </button>
      </div>

      <nav style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px', borderRadius: '10px', textDecoration: 'none',
              fontSize: '14px', fontWeight: 500,
              color: active ? '#a5b4fc' : '#94a3b8',
              background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
              border: active ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ color: active ? '#818cf8' : '#64748b', flexShrink: 0 }}>{item.icon}</span>
              {item.label}
              {active && <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#818cf8', flexShrink: 0 }} />}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        <p style={{ fontSize: '11px', color: '#334155' }}>© {new Date().getFullYear()} STATE OS</p>
      </div>
    </aside>
  );
}