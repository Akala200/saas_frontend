'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ClientHeader() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUsername(user?.name || user?.email || 'User');
      } catch (err) {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, []);

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/dashboard" className="text-sm text-blue-500 hover:underline">
        Account
      </Link>
      <span className="text-sm text-gray-600">
        👋 {username ? `Welcome, ${username}` : 'Not signed in'}
      </span>
    </header>
  );
}
