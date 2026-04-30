'use client';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-20 w-full h-20 flex items-center justify-between px-8 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-md">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-white font-medium">{user?.name || user?.email || 'Asesor'}</span>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-400 flex items-center justify-center shadow-lg">
          <FiUser className="text-white text-xl" />
        </div>
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </header>
  );
}
