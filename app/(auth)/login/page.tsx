'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const isEmail = formData.identifier.includes('@');
      const payload = isEmail
        ? { email: formData.identifier, password: formData.password }
        : { username: formData.identifier, password: formData.password };

      const response = await api.login(payload);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success(`Welcome back, ${response.user.name}!`);
      router.push('/task-tracker');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'mt-2 w-full rounded-2xl border border-md-outline-variant/20 bg-md-surface-container-low px-4 py-3.5 text-sm text-md-on-surface placeholder-md-outline transition-all duration-200 focus:border-md-primary/50 focus:bg-md-surface-container focus:outline-none focus:ring-2 focus:ring-md-primary/30';

  return (
    <div className="relative">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-16 -top-10 hidden sm:block">
        <div className="md-cookie md-cookie-3 animate-float bg-md-primary/10" />
      </div>
      <div className="pointer-events-none absolute -bottom-8 -right-12 hidden sm:block">
        <div className="md-cookie md-cookie-2 animate-pulse-glow bg-[#E8B4CB]/10" />
      </div>

      <div className="animate-fade-in mx-auto w-full max-w-md rounded-[28px] border border-md-outline-variant/15 bg-md-surface-container p-8 shadow-xl shadow-black/15 sm:p-10">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-md-primary/15">
            <span className="material-symbols-outlined text-[28px] text-md-primary">
              login
            </span>
          </div>
          <h1 className="md-headline-small"><span className="gradient-text">Welcome back</span></h1>
          <p className="md-body-medium mt-2 text-md-on-surface-variant">
            Log in to access your tasks and courses.
          </p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-md-error/20 bg-md-error-container/20 px-4 py-3 text-sm text-md-error">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="identifier" className="md-label-large text-md-on-surface-variant">
              Email or Username
            </label>
            <input
              id="identifier"
              type="text"
              required
              value={formData.identifier}
              onChange={(e) => setFormData((prev) => ({ ...prev, identifier: e.target.value }))}
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="md-label-large text-md-on-surface-variant">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E8B4CB]/15 px-6 py-3.5 text-sm font-semibold text-md-on-primary shadow-md shadow-md-primary/25 transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-md-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-md-on-primary border-t-transparent" />
                Logging in…
              </>
            ) : (
              'Log in'
            )}
          </button>
        </form>

        <hr className="md-divider-gradient mt-8" />

        <div className="mt-6 text-center text-sm text-md-on-surface-variant">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-semibold text-md-primary transition hover:text-md-tertiary"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
