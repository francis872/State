'use client';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard':   'Dashboard',
  '/analytics':   'Analytics',
  '/pipeline':    'Pipeline',
  '/contacts':    'Contactos',
  '/properties':  'Propiedades',
  '/ai-score':    'AI Score',
  '/inbox':       'Inbox',
  '/billing':     'Facturación',
  '/settings':    'Ajustes',
};

interface TopbarProps {
  onToggle: () => void;
}

export default function Topbar({ onToggle }: TopbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const pageTitle = PAGE_TITLES[pathname] ?? 'STATE OS';
  const initials = user?.name
    ? user.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 30,
      width: '100%',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      background: 'rgba(13,15,26,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
      gap: '16px',
      flexShrink: 0,
    }}>
      {/* Left: hamburger + page title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <button
          onClick={onToggle}
          aria-label="Toggle menú"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: 'none',
            background: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <FiMenu size={20} />
        </button>
        <h1 style={{
          color: '#f8fafc',
          fontWeight: 600,
          fontSize: '15px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{pageTitle}</h1>
      </div>

      {/* Right: user info + logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '4px' }}>
          <span style={{ color: '#f8fafc', fontSize: '14px', fontWeight: 500, lineHeight: '1.2' }}>{user?.name || 'Asesor'}</span>
          <span style={{ color: '#64748b', fontSize: '11px', lineHeight: '1.2' }}>{user?.org?.plan || 'BASIC'}</span>
        </div>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #9333ea)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '11px',
          fontWeight: 700,
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(99,102,241,0.4)',
        }}>
          {initials}
        </div>
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            color: '#64748b',
            cursor: 'pointer',
          }}
        >
          <FiLogOut size={16} />
        </button>
      </div>
    </header>
  );
}
