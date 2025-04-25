'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import Cookies from 'js-cookie'; // npm install js-cookie

interface User {
  id: string;
  email: string;
  name: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;

      Cookies.set('token', token, { expires: 7 }); // expires in 7 days
      setUser(user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    try {
      const res = await api.post('/auth/register', data);
      const { token, user } = res.data;

      Cookies.set('token', token, { expires: 7 });
      setUser(user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  const checkAuth = async () => {
    const token = Cookies.get('token');

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error('Auth check failed', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { user, login, register, logout, loading };
};
