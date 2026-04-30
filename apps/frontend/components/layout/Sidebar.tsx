import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiUsers, FiTrello, FiMail, FiBarChart2, FiSettings, FiCreditCard, FiHome, FiZap } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <FiGrid size={20} /> },
  { label: 'Analytics', href: '/analytics', icon: <FiBarChart2 size={20} /> },
  { label: 'Pipeline', href: '/pipeline', icon: <FiTrello size={20} /> },
  { label: 'Contacts', href: '/contacts', icon: <FiUsers size={20} /> },
  { label: 'Propiedades', href: '/properties', icon: <FiHome size={20} /> },
  { label: 'AI Score', href: '/ai-score', icon: <FiZap size={20} /> },
  { label: 'Inbox', href: '/inbox', icon: <FiMail size={20} /> },
  { label: 'Billing', href: '/billing', icon: <FiCreditCard size={20} /> },
  { label: 'Settings', href: '/settings', icon: <FiSettings size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl flex flex-col z-30">
      <div className="flex items-center gap-2 px-8 py-8">
        <div className="w-3 h-3 bg-gradient-to-tr from-purple-500 to-blue-400 rounded-full" />
        <span className="font-bold text-xl tracking-widest text-white">STATE</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-white/80 hover:bg-white/20 hover:text-white ${pathname === item.href ? 'bg-white/20 text-white' : ''}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto px-8 py-6">
        <span className="text-xs text-white/40">© {new Date().getFullYear()} STATE OS</span>
      </div>
    </aside>
  );
}
