'use client';

import { useEffect, useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/use-auth';
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

const inputClass =
  'mt-2 w-full rounded-2xl bg-md-surface-container-low px-4 py-3 text-sm text-md-on-surface placeholder-md-outline transition-colors duration-200 focus:bg-md-surface-container focus:outline-none focus:ring-2 focus:ring-md-primary/50';

export function CourseManagement() {
  const { isLoggedIn } = useAuth();
  const [courses, setCourses] = useState<MataKuliah[]>([]);
  const [formData, setFormData] = useState({ nama: '', deskripsi: '', sks: 3 });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      api.getMataKuliah()
        .then(setCourses)
        .catch(() => toast.error('Failed to load courses'))
        .finally(() => setLoading(false));
    } else {
      setCourses(mockCourses);
      setLoading(false);
    }
  }, [isLoggedIn]);

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
      setCourses((prev) => [...prev, newCourse]);
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-md-primary border-t-transparent" />
      </div>
    );
  }

  const totalSks = courses.reduce((sum, c) => sum + c.sks, 0);
  const totalTasks = courses.reduce((sum, c) => sum + (c._count?.tugas || 0), 0);

  const statCards = [
    { label: 'Total courses', value: courses.length, icon: 'school', accent: 'border-l-4 border-l-md-primary', iconBg: 'bg-md-primary-container', iconColor: 'text-md-on-primary-container' },
    { label: 'Total tasks', value: totalTasks, icon: 'task_alt', accent: 'border-l-4 border-l-md-primary', iconBg: 'bg-md-secondary-container', iconColor: 'text-md-on-secondary-container' },
    { label: 'Total SKS', value: totalSks, icon: 'credit_score', accent: 'border-l-4 border-l-md-primary', iconBg: 'bg-md-tertiary-container', iconColor: 'text-md-on-tertiary-container' },
  ];

  const courseAccents = [
    { chip: 'bg-md-primary-container/60 text-md-on-primary-container' },
    { chip: 'bg-md-secondary-container/60 text-md-on-secondary-container' },
    { chip: 'bg-md-tertiary-container/60 text-md-on-tertiary-container' },
  ];

  return (
    <section className="relative animate-fade-in space-y-8">
      {/* Cookie decoration */}
      <div className="pointer-events-none absolute -right-16 top-8">
        <div className="md-cookie md-cookie-2 animate-pulse-glow bg-md-primary-container/20" />
      </div>

      {!isLoggedIn && (
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-md-secondary-container/25 px-4 py-2.5 text-sm text-md-on-secondary-container">
          <span className="material-symbols-outlined text-[18px]">info</span>
          Preview mode — log in to manage your courses.
        </div>
      )}

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map((stat, i) => (
          <div
            key={stat.label}
            className={`animate-fade-in flex items-center gap-4 rounded-[24px] border border-md-outline-variant/15 bg-md-surface-container p-5 shadow-sm shadow-black/8 ${stat.accent} delay-${i + 1}`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg}`}>
              <span className={`material-symbols-outlined text-[24px] ${stat.iconColor}`}>{stat.icon}</span>
            </div>
            <div>
              <p className="md-label-medium uppercase tracking-wider text-md-on-surface-variant">{stat.label}</p>
              <p className="mt-0.5 text-3xl font-bold text-md-on-surface">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main card */}
      <div className="relative rounded-[28px] border border-md-outline-variant/15 bg-md-surface-container p-6 shadow-md shadow-black/10 sm:p-8">
        <header className="flex flex-col gap-3 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="md-label-medium uppercase tracking-[0.2em] text-[#E8B4CB]">Course roster</p>
            <h2 className="md-title-large mt-1 text-md-on-surface">All your courses</h2>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 rounded-full bg-md-primary px-5 py-2.5 text-sm font-semibold text-md-on-primary shadow-md shadow-md-primary/20 transition-all duration-200 hover:brightness-110 hover:shadow-lg"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showForm ? 'close' : 'add'}
              </span>
              {showForm ? 'Cancel' : 'Add Course'}
            </button>
          )}
        </header>

        {/* Soft divider */}
        <div className="h-px bg-md-outline-variant/20" />

        {/* Form */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showForm && isLoggedIn ? 'mt-6 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-[20px] bg-md-surface-container-low p-5 sm:grid-cols-2"
          >
            <label className="md-label-large text-md-on-surface-variant">
              Course name
              <input type="text" required value={formData.nama} onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))} placeholder="Human-Computer Interaction" className={inputClass} />
            </label>
            <label className="md-label-large text-md-on-surface-variant">
              Credits (SKS)
              <input type="number" required min={1} max={6} value={formData.sks} onChange={(e) => setFormData((prev) => ({ ...prev, sks: Number(e.target.value) }))} className={inputClass} />
            </label>
            <label className="md-label-large text-md-on-surface-variant sm:col-span-2">
              Description
              <textarea rows={2} value={formData.deskripsi} onChange={(e) => setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))} placeholder="Course description" className={inputClass} />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-md-primary px-6 py-3 text-sm font-semibold text-md-on-primary shadow-md shadow-md-primary/20 transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
                {submitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-md-on-primary border-t-transparent" />
                    Creating…
                  </>
                ) : (
                  'Create Course'
                )}
              </button>
            </div>
          </form>
        </div>

        <hr className="md-divider-gradient mt-5" />

        {/* Course list */}
        <div className="mt-5 space-y-3">
          {courses.length === 0 && isLoggedIn ? (
            <div className="rounded-[20px] bg-md-surface-container-low p-8 text-center text-sm text-md-on-surface-variant">
              <span className="material-symbols-outlined mb-2 text-[32px] text-md-outline">school</span>
              <p>Add your first course to get started.</p>
            </div>
          ) : (
            courses.map((course, i) => {
              const accent = courseAccents[i % courseAccents.length];
              return (
                <article
                  key={course.id}
                  className={`animate-fade-in flex flex-col gap-4 border-b border-md-outline-variant/15 px-5 py-4 transition-colors duration-200 last:border-b-0 hover:bg-md-surface-container-low sm:flex-row sm:items-center sm:justify-between delay-${i + 1}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent.chip}`}>
                      <span className="material-symbols-outlined text-[20px]">book</span>
                    </div>
                    <div>
                      <h3 className="md-title-medium text-md-on-surface">{course.nama}</h3>
                      <p className="md-body-small mt-0.5 text-md-on-surface-variant">{course.deskripsi}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-md-surface-container-highest px-3 py-1 text-xs font-semibold text-md-on-surface">
                      {course.sks} SKS
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${accent.chip}`}>
                      <span className="material-symbols-outlined text-[14px]">task</span>
                      {course._count?.tugas || 0} tasks
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
