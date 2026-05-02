'use client';
import { useState, useEffect } from 'react';
import { FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
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
  onMobileMenuToggle: () => void;
  onDesktopMenuToggle: () => void;
}

export default function Topbar({ onMobileMenuToggle, onDesktopMenuToggle }: TopbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const pageTitle = PAGE_TITLES[pathname] ?? 'STATE OS';
  const initials = user?.name
    ? user.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 flex items-center justify-between px-4 md:px-6 bg-[#0d0f1a]/80 backdrop-blur-xl border-b border-white/5 shadow-md gap-4">
      {/* Left: hamburger + page title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        {!isDesktop && (
          <button
            onClick={onMobileMenuToggle}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 flex-shrink-0"
            aria-label="Abrir menú"
          >
            <FiMenu size={20} />
          </button>
        )}
        {/* Desktop hamburger — secondary toggle (also in floating button) */}
        {isDesktop && (
          <button
            onClick={onDesktopMenuToggle}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 flex-shrink-0"
            aria-label="Colapsar menú"
          >
            <FiMenu size={20} />
          </button>
        )}
        <h1 className="text-white font-semibold text-base truncate">{pageTitle}</h1>
      </div>

      {/* Right: user info + logout */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex-col items-end mr-1" style={{ display: isDesktop ? 'flex' : 'none' }}>
          <span className="text-white text-sm font-medium leading-tight">{user?.name || 'Asesor'}</span>
          <span className="text-slate-500 text-xs leading-tight">{user?.org?.plan || 'BASIC'}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg text-white text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/10"
        >
          <FiLogOut size={16} />
        </button>
      </div>
    </header>
  );
}
