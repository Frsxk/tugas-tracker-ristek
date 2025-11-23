'use client';

import { useEffect, useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';
import type { MataKuliah } from '@/types';

const courseSchema = z.object({
  nama: z.string().min(3, 'Course name must be at least 3 characters').max(100, 'Course name too long'),
  deskripsi: z.string().max(500, 'Description too long').optional(),
  sks: z.number().min(1, 'SKS must be at least 1').max(6, 'SKS cannot exceed 6'),
});

const mockCourses = [
  { id: '1', nama: 'Intro to Algorithms', deskripsi: 'Learn fundamental algorithms', sks: 3, userId: '', createdAt: '', updatedAt: '', _count: { tugas: 5 } },
  { id: '2', nama: 'Applied Statistics', deskripsi: 'Statistical methods and analysis', sks: 4, userId: '', createdAt: '', updatedAt: '', _count: { tugas: 3 } },
  { id: '3', nama: 'Modern Indonesian History', deskripsi: 'History of modern Indonesia', sks: 2, userId: '', createdAt: '', updatedAt: '', _count: { tugas: 2 } },
];

export function CourseManagement() {
  const [courses, setCourses] = useState<MataKuliah[]>([]);
  const [formData, setFormData] = useState({ nama: '', deskripsi: '', sks: 3 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loggedIn = !!localStorage.getItem('user');
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      api.getMataKuliah()
        .then(setCourses)
        .catch(() => toast.error('Failed to load courses'))
        .finally(() => setLoading(false));
    } else {
      setCourses(mockCourses);
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const validation = courseSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    try {
      const newCourse = await api.createMataKuliah(formData);
      setCourses(prev => [...prev, newCourse]);
      setFormData({ nama: '', deskripsi: '', sks: 3 });
      setShowForm(false);
      toast.success('Course created successfully!');
    } catch {
      toast.error('Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }
  return (
    <section className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Total courses</p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">{courses.length}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Total tasks</p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">{courses.reduce((sum, c) => sum + (c._count?.tugas || 0), 0)}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Total SKS</p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">{courses.reduce((sum, c) => sum + c.sks, 0)}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <header className="flex flex-col gap-2 border-b border-dashed border-zinc-200 pb-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              Course roster
            </p>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">All your courses</h2>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'Add Course'}
            </button>
          )}
        </header>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showForm && isLoggedIn ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50 sm:grid-cols-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Course name
              <input
                type="text"
                required
                value={formData.nama}
                onChange={e => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                placeholder="Human-Computer Interaction"
                className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </label>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Credits (SKS)
              <input
                type="number"
                required
                min={1}
                max={6}
                value={formData.sks}
                onChange={e => setFormData(prev => ({ ...prev, sks: Number(e.target.value) }))}
                className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </label>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200 sm:col-span-2">
              Description
              <textarea
                rows={2}
                value={formData.deskripsi}
                onChange={e => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                placeholder="Course description"
                className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 space-y-4">
          {courses.length === 0 && isLoggedIn ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Add your first course by clicking the button above.
              </p>
            </div>
          ) : (
            courses.map((course) => (
            <article
              key={course.id}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 px-5 py-4 transition hover:border-blue-200 dark:border-zinc-700 dark:hover:border-blue-500/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  {course.id.slice(0, 6)}
                </p>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-blue-200">{course.nama}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">{course.deskripsi}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {course.sks} SKS
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                  {course._count?.tugas || 0} tasks
                </span>
              </div>
            </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
