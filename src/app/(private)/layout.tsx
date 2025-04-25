'use client';

import withAuth from '@/components/withAuth';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden sm:block">
        <h2 className="text-xl font-bold mb-8">MyDashboard</h2>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block hover:text-blue-600">
            🏠 Overview
          </Link>
          <Link href="/dashboard/content" className="block hover:text-blue-600">
            📂 Content
          </Link>
          <Link href="/dashboard/recommendations" className="block hover:text-blue-600">
            ✨ Recommendations
          </Link>
          <button
            onClick={logout}
            className="mt-10 text-red-500 hover:text-red-600 text-sm"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}

export default withAuth(DashboardLayout);
