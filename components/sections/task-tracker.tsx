'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { mapStatus } from '@/lib/utils';
import type { Tugas } from '@/types';

const columns = [
  { key: 'Not Started' as const, color: 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950' },
  { key: 'In Progress' as const, color: 'border-blue-200/70 bg-blue-50/60 dark:border-blue-500/30 dark:bg-blue-500/5' },
  { key: 'Completed' as const, color: 'border-emerald-200/70 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/5' },
];

export function TaskTracker() {
  const [tasks, setTasks] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    api.getTugas()
      .then(setTasks)
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, newStatus: typeof columns[number]['key']) => {
    try {
      await api.updateTugas(id, { status: mapStatus.toBackend(newStatus) });
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status: mapStatus.toBackend(newStatus) } : t));
      setOpenDropdown(null);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const getAvailableStatuses = (current: typeof columns[number]['key']) => {
    return columns.filter(c => c.key !== current).map(c => c.key);
  };

  if (loading) return <div className="text-center py-8">Loading tasks...</div>;

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter(t => mapStatus.toFrontend(t.status) === column.key);
          return (
            <div key={column.key} className={`rounded-3xl border p-4 shadow-inner ${column.color}`}>
              <div className="flex items-center justify-between text-sm font-semibold text-zinc-600 dark:text-zinc-200">
                <span>{column.key}</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">{columnTasks.length} items</span>
              </div>
              <div className="mt-4 space-y-3">
                {columnTasks.map((task) => (
                  <article
                    key={task.id}
                    className="rounded-2xl border border-white/0 bg-white/80 px-4 py-3 text-sm shadow-sm ring-1 ring-black/5 backdrop-blur dark:bg-zinc-900/70"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
                      {task.id.slice(0, 8)}
                    </p>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-blue-200">
                      {task.nama}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{task.mataKuliah?.nama}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                      <span>Due {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}
                          className="rounded-full px-3 py-1 font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 transition"
                        >
                          Update status
                        </button>
                        <div className={`absolute right-0 top-full mt-1 w-32 rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-200 ease-in-out origin-top ${openDropdown === task.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                          {getAvailableStatuses(column.key).map(status => (
                            <button
                              key={status}
                              onClick={() => updateStatus(task.id, status)}
                              className="w-full z-100 px-3 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 first:rounded-t-xl last:rounded-b-xl transition"
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
                {columnTasks.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-zinc-300 p-4 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                    No tasks yet
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
