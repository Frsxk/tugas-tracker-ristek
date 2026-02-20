'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'mt-2 w-full rounded-2xl border border-md-outline-variant/20 bg-md-surface-container-low px-4 py-3.5 text-sm text-md-on-surface placeholder-md-outline transition-all duration-200 focus:border-md-primary/50 focus:bg-md-surface-container focus:outline-none focus:ring-2 focus:ring-md-primary/30';

  const fields = [
    { id: 'name', label: 'Full name', type: 'text', placeholder: 'John Doe' },
    { id: 'username', label: 'Username', type: 'text', placeholder: 'johndoe' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
    { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
  ] as const;

  return (
    <div className="relative">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-12 -top-10 hidden sm:block">
        <div className="md-cookie md-cookie-4 animate-float bg-md-primary/10" />
      </div>
      <div className="pointer-events-none absolute -bottom-8 -left-14 hidden sm:block">
        <div className="md-cookie md-cookie-1 animate-pulse-glow bg-[#E8B4CB]/10" />
      </div>

      <div className="animate-fade-in mx-auto w-full max-w-md rounded-[28px] border border-md-outline-variant/15 bg-md-surface-container p-8 shadow-xl shadow-black/15 sm:p-10">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
            <span className="material-symbols-outlined text-[28px] text-[#E8B4CB]">
              person_add
            </span>
          </div>
          <h1 className="md-headline-small"><span className="gradient-text">Create your account</span></h1>
          <p className="md-body-medium mt-2 text-md-on-surface-variant">
            Start your academic boost with Tugas Tracker today.
          </p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-md-error/20 bg-md-error-container/20 px-4 py-3 text-sm text-md-error">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {fields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="md-label-large text-md-on-surface-variant">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                required
                value={formData[field.id as keyof typeof formData]}
                onChange={(e) => setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))}
                placeholder={field.placeholder}
                className={inputClass}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E8B4CB]/15 px-6 py-3.5 mt-10 text-sm font-semibold text-md-on-primary shadow-md shadow-md-primary/25 transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-md-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-md-on-primary border-t-transparent" />
                Creating account…
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <hr className="md-divider-gradient mt-8" />

        <div className="mt-6 text-center text-sm text-md-on-surface-variant">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-md-primary transition hover:text-md-tertiary"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
