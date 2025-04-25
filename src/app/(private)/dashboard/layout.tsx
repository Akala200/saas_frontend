'use client';

import withAuth from '@/components/withAuth';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: '🏠 Overview' },
    { href: '/dashboard/contents', label: '📂 Content' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md hidden sm:flex flex-col p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-10 tracking-tight">
          MyDashboard
        </h2>

        <nav className="space-y-4 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md transition-all ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-12 text-sm text-red-500 hover:text-red-600 transition-colors"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-auto">
        {children}
      </main>
    </div>
  );
}

export default withAuth(DashboardLayout);
