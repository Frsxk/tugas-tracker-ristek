'use client';

import { useEffect, useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/use-auth';
import { mapStatus } from '@/lib/utils';
import type { Tugas, MataKuliah } from '@/types';

const taskSchema = z.object({
  nama: z.string().min(3, 'Task name must be at least 3 characters').max(200, 'Task name too long'),
  mataKuliahId: z.string().min(1, 'Please select a course'),
  deadline: z.string().min(1, 'Please select a due date'),
  deskripsi: z.string().max(1000, 'Description too long').optional(),
});

const mockTasks = [
  { id: '1', nama: 'Assignment 2 - Sorting', deskripsi: '', status: 'PENDING' as const, deadline: '2024-03-12', mataKuliahId: '1', userId: '', createdAt: '', updatedAt: '', mataKuliah: { id: '1', nama: 'Intro to Algorithms', sks: 3 } },
  { id: '2', nama: 'Statistics lab report', deskripsi: '', status: 'IN_PROGRESS' as const, deadline: '2024-03-15', mataKuliahId: '2', userId: '', createdAt: '', updatedAt: '', mataKuliah: { id: '2', nama: 'Applied Statistics', sks: 4 } },
  { id: '3', nama: 'Reading reflection', deskripsi: '', status: 'COMPLETED' as const, deadline: '2024-03-08', mataKuliahId: '3', userId: '', createdAt: '', updatedAt: '', mataKuliah: { id: '3', nama: 'Modern Indonesian History', sks: 2 } },
];

const statusChip: Record<string, string> = {
  'Not Started': 'bg-md-surface-container-highest text-md-on-surface',
  'In Progress': 'bg-md-secondary-container text-md-on-secondary-container',
  'Completed': 'bg-md-primary-container text-md-on-primary-container',
};

const statusIcon: Record<string, string> = {
  'Not Started': 'schedule',
  'In Progress': 'autorenew',
  'Completed': 'check_circle',
};

const inputClass =
  'mt-2 w-full rounded-2xl bg-md-surface-container-low px-4 py-3 text-sm text-md-on-surface placeholder-md-outline transition-colors duration-200 focus:bg-md-surface-container focus:outline-none focus:ring-2 focus:ring-md-primary/50';

export function TaskManagement() {
  const { isLoggedIn } = useAuth();
  const [tasks, setTasks] = useState<Tugas[]>([]);
  const [courses, setCourses] = useState<MataKuliah[]>([]);
  const [formData, setFormData] = useState({ nama: '', mataKuliahId: '', deadline: '', deskripsi: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api.getTugas().then(setTasks),
        api.getMataKuliah().then(setCourses),
      ])
        .catch(() => toast.error('Failed to load data'))
        .finally(() => setLoading(false));
    } else {
      setTasks(mockTasks);
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleDelete = (id: string) => {
    toast('Delete this task?', {
      action: {
        label: 'Confirm',
        onClick: async () => {
          try {
            await api.deleteTugas(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
            toast.success('Task deleted successfully!');
          } catch {
            toast.error('Failed to delete task');
          }
        },
      },
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = taskSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const newTask = await api.createTugas({ ...formData, status: 'PENDING' });
      setTasks((prev) => [...prev, newTask]);
      setFormData({ nama: '', mataKuliahId: '', deadline: '', deskripsi: '' });
      setShowForm(false);
      toast.success('Task created successfully!');
    } catch {
      toast.error('Failed to create task');
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

  return (
    <section className="relative animate-fade-in space-y-8">
      {/* Cookie decorations */}
      <div className="pointer-events-none absolute -left-16 top-24">
        <div className="md-cookie md-cookie-3 animate-float bg-md-secondary-container/12" />
      </div>
      <div className="pointer-events-none absolute -right-12 bottom-32">
        <div className="md-cookie md-cookie-2 animate-pulse-glow bg-md-primary-container/12" />
      </div>

      {!isLoggedIn && (
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-md-secondary-container/25 px-4 py-2.5 text-sm text-md-on-secondary-container">
          <span className="material-symbols-outlined text-[18px]">info</span>
          Preview mode — log in to manage your tasks.
        </div>
      )}

      <div className="relative rounded-[28px] border border-md-outline-variant/15 bg-md-surface-container p-6 shadow-md shadow-black/10 sm:p-8">
        <header className="flex flex-col gap-3 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="md-label-medium uppercase tracking-[0.2em] text-[#E8B4CB]">Task ledger</p>
            <h2 className="md-title-large mt-1 text-md-on-surface">All your tasks at a glance</h2>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 rounded-full bg-md-primary px-5 py-2.5 text-sm font-semibold text-md-on-primary shadow-md shadow-md-primary/20 transition-all duration-200 hover:brightness-110 hover:shadow-lg"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showForm ? 'close' : 'add'}
              </span>
              {showForm ? 'Cancel' : 'Add Task'}
            </button>
          )}
        </header>

        <div className="h-px bg-md-outline-variant/20" />

        {/* Form */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showForm && isLoggedIn ? 'mt-6 max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-[20px] bg-md-surface-container-low p-5 sm:grid-cols-2"
          >
            <label className="md-label-large text-md-on-surface-variant">
              Task name
              <input type="text" required value={formData.nama} onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))} placeholder="Group presentation" className={inputClass} />
            </label>
            <label className="md-label-large text-md-on-surface-variant">
              Linked course
              <select required value={formData.mataKuliahId} onChange={(e) => setFormData((prev) => ({ ...prev, mataKuliahId: e.target.value }))} className={inputClass}>
                <option value="">Select course</option>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.nama}</option>)}
              </select>
            </label>
            <label className="md-label-large text-md-on-surface-variant">
              Due date
              <input type="date" required value={formData.deadline} onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))} className={inputClass} />
            </label>
            <label className="md-label-large text-md-on-surface-variant sm:col-span-2">
              Description
              <textarea rows={3} value={formData.deskripsi} onChange={(e) => setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))} placeholder="Outline requirements, attach resources, etc." className={inputClass} />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-md-primary px-6 py-3 text-sm font-semibold text-md-on-primary shadow-md shadow-md-primary/20 transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
                {submitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-md-on-primary border-t-transparent" />
                    Creating…
                  </>
                ) : (
                  'Create Task'
                )}
              </button>
            </div>
          </form>
        </div>

        <hr className="md-divider-gradient mt-5" />

        {/* Task list — cards on mobile, table on md+ */}
        <div className="mt-4">
          {tasks.length === 0 && isLoggedIn ? (
            <div className="rounded-[20px] bg-md-surface-container-low p-8 text-center text-sm text-md-on-surface-variant">
              <span className="material-symbols-outlined mb-2 block text-[32px] text-md-outline">assignment</span>
              Add your first task by clicking the button above.
            </div>
          ) : (
            <>
              {/* Mobile cards */}
              <div className="space-y-3 md:hidden">
                {tasks.map((task) => {
                  const status = mapStatus.toFrontend(task.status);
                  return (
                    <article key={task.id} className="rounded-[18px] bg-md-surface-container-low p-4 transition-colors hover:bg-md-surface-container-high">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="md-title-medium truncate text-md-on-surface">{task.nama}</h3>
                          <p className="md-body-small mt-0.5 text-md-on-surface-variant">{task.mataKuliah?.nama}</p>
                        </div>
                        <span className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${statusChip[status]}`}>
                          <span className="material-symbols-outlined text-[14px]">{statusIcon[status]}</span>
                          {status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-xs text-md-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        {isLoggedIn && (
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="inline-flex items-center gap-1 rounded-full bg-md-error/10 px-3 py-1 text-xs font-semibold text-md-error transition hover:bg-md-error/20"
                          >
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                            Delete
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-md-on-surface-variant">
                      <th className="pb-3 font-semibold">Task</th>
                      <th className="pb-3 font-semibold">Course</th>
                      <th className="pb-3 font-semibold">Due</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-md-outline-variant/10">
                    {tasks.map((task) => {
                      const status = mapStatus.toFrontend(task.status);
                      return (
                        <tr key={task.id} className="text-sm text-md-on-surface transition-colors hover:bg-md-surface-container-low/50">
                          <td className="py-3.5 font-medium text-md-on-surface">{task.nama}</td>
                          <td className="py-3.5 text-md-on-surface-variant">{task.mataKuliah?.nama}</td>
                          <td className="py-3.5 text-md-on-surface-variant">
                            {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="py-3.5">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusChip[status]}`}>
                              <span className="material-symbols-outlined text-[14px]">{statusIcon[status]}</span>
                              {status}
                            </span>
                          </td>
                          <td className="py-3.5">
                            {isLoggedIn && (
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="inline-flex items-center gap-1 rounded-full bg-md-error/10 px-3 py-1 text-xs font-semibold text-md-error transition hover:bg-md-error/20"
                              >
                                <span className="material-symbols-outlined text-[14px]">delete</span>
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

