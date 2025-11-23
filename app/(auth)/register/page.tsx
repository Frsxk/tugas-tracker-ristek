'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const response = await api.register(formData);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success(`Welcome, ${response.user.name}!`);
      router.push('/task-tracker');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white px-8 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
          Get started
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-white">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Start your academic boost with Tugas Tracker today.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="John Doe"
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="your@email.com"
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="••••••••"
            className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-center text-zinc-600 dark:text-zinc-300">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:text-gray-500 dark:text-blue-400"> Login Now</a>
        </p>
      </div>
    </div>
  );
}
