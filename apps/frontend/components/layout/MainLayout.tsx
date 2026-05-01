'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { usePathname } from 'next/navigation';

const NO_LAYOUT_PATHS = ['/', '/login'];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  if (NO_LAYOUT_PATHS.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1117] via-[#141824] to-[#0f1117] flex">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Spacer — reserves sidebar width on desktop only when sidebar is open */}
      <div
        className={desktopSidebarOpen ? 'hidden lg:block shrink-0' : 'hidden'}
        style={{ width: '256px' }}
        aria-hidden="true"
      />

      <Sidebar
        mobileOpen={mobileSidebarOpen}
        desktopOpen={desktopSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onMobileMenuToggle={() => setMobileSidebarOpen(s => !s)}
          onDesktopMenuToggle={() => setDesktopSidebarOpen(s => !s)}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
