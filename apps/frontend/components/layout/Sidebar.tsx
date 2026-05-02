'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiUsers, FiTrello, FiMail, FiBarChart2, FiSettings, FiCreditCard, FiHome, FiZap, FiX } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard',    href: '/dashboard',   icon: <FiGrid size={18} /> },
  { label: 'Analytics',    href: '/analytics',   icon: <FiBarChart2 size={18} /> },
  { label: 'Pipeline',     href: '/pipeline',    icon: <FiTrello size={18} /> },
  { label: 'Contactos',    href: '/contacts',    icon: <FiUsers size={18} /> },
  { label: 'Propiedades',  href: '/properties',  icon: <FiHome size={18} /> },
  { label: 'AI Score',     href: '/ai-score',    icon: <FiZap size={18} /> },
  { label: 'Inbox',        href: '/inbox',       icon: <FiMail size={18} /> },
  { label: 'Facturación',  href: '/billing',     icon: <FiCreditCard size={18} /> },
  { label: 'Ajustes',      href: '/settings',    icon: <FiSettings size={18} /> },
];

interface SidebarProps {
  mobileOpen: boolean;
  desktopOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, desktopOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Shared content rendered in both desktop and mobile sidebars
  const inner = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <span className="text-white font-black text-xs">S</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-white whitespace-nowrap">STATE OS</span>
        </div>
        {/* Close button - mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 shrink-0"
          aria-label="Cerrar menú"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                active
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white',
              ].join(' ')}
            >
              <span className={active ? 'text-indigo-400 shrink-0' : 'text-slate-500 shrink-0'}>
                {item.icon}
              </span>
              {item.label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/5 shrink-0">
        <p className="text-xs text-slate-600 whitespace-nowrap">© {new Date().getFullYear()} STATE OS</p>
        <p className="text-xs text-slate-700 mt-0.5 whitespace-nowrap">Medellín, Colombia</p>
      </div>
    </>
  );

  return (
    <>
      {/* ── DESKTOP: in layout flow, collapses via width ── */}
      <aside
        className="hidden lg:flex flex-col shrink-0 bg-[#0d0f1a]/95 backdrop-blur-xl border-r border-white/8 shadow-2xl overflow-hidden"
        style={{
          width: desktopOpen ? '256px' : '0px',
          transition: 'width 300ms ease-in-out',
        }}
      >
        {inner}
      </aside>

      {/* ── MOBILE: fixed overlay, slides in/out ── */}
      <aside
        className="fixed left-0 top-0 h-full w-64 z-50 lg:hidden bg-[#0d0f1a]/95 backdrop-blur-xl border-r border-white/8 shadow-2xl flex flex-col"
        style={{
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 300ms ease-in-out',
        }}
      >
        {inner}
      </aside>
    </>
  );
}
