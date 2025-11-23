'use client';

import { useEffect, useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '@/lib/api';
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

const statusColors: Record<string, string> = {
  'Not Started': 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
  'In Progress': 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300',
  'Completed': 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300',
};

export function TaskManagement() {
  const [tasks, setTasks] = useState<Tugas[]>([]);
  const [courses, setCourses] = useState<MataKuliah[]>([]);
  const [formData, setFormData] = useState({ nama: '', mataKuliahId: '', deadline: '', deskripsi: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loggedIn = !!localStorage.getItem('user');
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      Promise.all([
        api.getTugas().then(setTasks),
        api.getMataKuliah().then(setCourses)
      ])
        .catch(() => toast.error('Failed to load data'))
        .finally(() => setLoading(false));
    } else {
      setTasks(mockTasks);
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.deleteTugas(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success('Task deleted successfully!');
    } catch {
      toast.error('Failed to delete task');
    }
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
      setTasks(prev => [...prev, newTask]);
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }
  return (
    <section className="space-y-8">
      {!isLoggedIn && (
        <p className="text-center text-sm italic text-zinc-500 dark:text-zinc-400">
          This is a preview. Login to manage your tasks here!
        </p>
      )}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <header className="flex flex-col gap-2 border-b border-dashed border-zinc-200 pb-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              Task ledger
            </p>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              All your tasks at a glance
            </h2>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : 'Add Task'}
            </button>
          )}
        </header>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showForm && isLoggedIn ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900/50 sm:grid-cols-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Task name
              <input
                type="text"
                required
                value={formData.nama}
                onChange={e => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                placeholder="Group presentation"
                className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </label>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Linked course
              <select
                required
                value={formData.mataKuliahId}
                onChange={e => setFormData(prev => ({ ...prev, mataKuliahId: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              >
                <option value="">Select course</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.nama}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Due date
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={e => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </label>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200 sm:col-span-2">
              Description
              <textarea
                rows={3}
                value={formData.deskripsi}
                onChange={e => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                placeholder="Outline requirements, attach resources, etc."
                className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <th className="pb-3">Task</th>
                <th className="pb-3">Course</th>
                <th className="pb-3">Due</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {tasks.length === 0 && isLoggedIn ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Add your first task by clicking the button above.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => {
                  const status = mapStatus.toFrontend(task.status);
                  return (
                    <tr key={task.id} className="text-sm text-zinc-700 dark:text-zinc-200">
                      <td className="py-3 font-medium text-zinc-900 dark:text-blue-200">{task.nama}</td>
                      <td className="py-3">{task.mataKuliah?.nama}</td>
                      <td className="py-3">{new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[status]}`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-3">
                        {isLoggedIn && (
                          <button onClick={() => handleDelete(task.id)} className="rounded-full border border-rose-200 px-3 py-1 text-rose-500 hover:bg-rose-50 dark:border-rose-500/40 dark:hover:bg-rose-500/10 transition text-xs font-semibold">
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
