'use client';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { usePathname } from 'next/navigation';

const NO_LAYOUT_PATHS = ['/', '/login'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (NO_LAYOUT_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#18192b] via-[#23244a] to-[#2e2f4e] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
