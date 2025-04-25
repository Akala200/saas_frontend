'use client';

import { Toaster } from 'react-hot-toast';

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Toaster position="top-right" />
      {/* Main */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer (optional) */}
      <footer className="text-xs text-center text-gray-400 py-4">
        &copy; {new Date().getFullYear()} MySaaS – Content Analytics
      </footer>
    </div>
  );
}
