'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/use-auth';
import { mapStatus } from '@/lib/utils';
import type { Tugas } from '@/types';

const mockTasks = [
  { id: '1', nama: 'Quiz prep set', deskripsi: '', status: 'PENDING' as const, deadline: '2024-03-20', mataKuliahId: '1', userId: '', createdAt: '', updatedAt: '', mataKuliah: { id: '1', nama: 'Applied Statistics', sks: 3 } },
  { id: '2', nama: 'Algorithm worksheet', deskripsi: '', status: 'IN_PROGRESS' as const, deadline: '2024-03-11', mataKuliahId: '2', userId: '', createdAt: '', updatedAt: '', mataKuliah: { id: '2', nama: 'Intro to Algorithms', sks: 3 } },
  { id: '3', nama: 'History documentary notes', deskripsi: '', status: 'IN_PROGRESS' as const, deadline: '2024-03-09', mataKuliahId: '3', userId: '', createdAt: '', updatedAt: '', mataKuliah: { id: '3', nama: 'Modern Indonesian History', sks: 2 } },
  { id: '4', nama: 'Lab report 2', deskripsi: '', status: 'COMPLETED' as const, deadline: '2024-03-05', mataKuliahId: '1', userId: '', createdAt: '', updatedAt: '', mataKuliah: { id: '1', nama: 'Applied Statistics', sks: 3 } },
];

const columns = [
  {
    key: 'Not Started' as const,
    icon: 'schedule',
    gradient: 'bg-md-surface-container',
    badge: 'bg-md-surface-container-highest text-md-on-surface',
    headerAccent: 'text-md-on-surface-variant',
    topLine: 'bg-md-primary',
  },
  {
    key: 'In Progress' as const,
    icon: 'autorenew',
    gradient: 'bg-md-surface-container',
    badge: 'bg-md-secondary-container text-md-on-secondary-container',
    headerAccent: 'text-md-primary',
    topLine: 'bg-md-primary',
  },
  {
    key: 'Completed' as const,
    icon: 'check_circle',
    gradient: 'bg-md-surface-container',
    badge: 'bg-md-primary-container text-md-on-primary-container',
    headerAccent: 'text-md-primary',
    topLine: 'bg-md-primary',
  },
];

export function TaskTracker() {
  const { isLoggedIn } = useAuth();
  const [tasks, setTasks] = useState<Tugas[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (columnRef.current && !columnRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getTugas()
        .then(setTasks)
        .catch(() => setTasks([]))
        .finally(() => setLoading(false));
    } else {
      setTasks(mockTasks);
      setLoading(false);
    }
  }, [isLoggedIn]);

  const updateStatus = async (id: string, newStatus: (typeof columns)[number]['key']) => {
    try {
      await api.updateTugas(id, { status: mapStatus.toBackend(newStatus) });
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: mapStatus.toBackend(newStatus) } : t)));
      setOpenDropdown(null);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const getAvailableStatuses = (current: (typeof columns)[number]['key']) => {
    return columns.filter((c) => c.key !== current).map((c) => c.key);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-md-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="relative animate-fade-in space-y-6">
      {/* Cookie decorations */}
      <div className="pointer-events-none absolute -left-20 top-24">
        <div className="md-cookie md-cookie-1 animate-pulse-glow bg-md-primary-container/8" />
      </div>
      <div className="pointer-events-none absolute -right-14 bottom-16">
        <div className="md-cookie md-cookie-3 animate-float bg-[#E8B4CB]/8" />
      </div>

      {!isLoggedIn && (
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-md-secondary-container/25 px-4 py-2.5 text-sm text-md-on-secondary-container">
          <span className="material-symbols-outlined text-[18px]">info</span>
          Preview mode — log in to track your tasks.
        </div>
      )}

      <div ref={columnRef} className="relative grid gap-5 md:grid-cols-3">
        {columns.map((column, colIdx) => {
          const columnTasks = tasks.filter((t) => mapStatus.toFrontend(t.status) === column.key);
          return (
            <div
              key={column.key}
              className={`animate-fade-in rounded-[24px] border border-md-outline-variant/15 ${column.gradient} shadow-md shadow-black/10 delay-${colIdx + 1}`}
            >
              {/* Colored top accent line */}
              <div className={`h-1.5 rounded-t-[24px] ${column.topLine}`} />

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[20px] ${column.headerAccent}`}>
                      {column.icon}
                    </span>
                    <span className={`md-label-large ${column.headerAccent}`}>{column.key}</span>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${column.badge}`}>
                    {columnTasks.length}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {columnTasks.map((task) => (
                    <article
                      key={task.id}
                      className="rounded-[18px] border border-md-outline-variant/10 bg-md-surface-container-low p-4 shadow-sm shadow-black/5 transition-all duration-200 hover:bg-md-surface-container-high hover:shadow-md hover:shadow-black/10"
                    >
                      <div className="flex items-start gap-2">
                        <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${column.badge}`}>
                          <span className="material-symbols-outlined text-[16px]">assignment</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="md-title-medium truncate text-md-on-surface">{task.nama}</h3>
                          <p className="md-body-small mt-0.5 text-md-on-surface-variant">
                            {task.mataKuliah?.nama}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-xs text-md-on-surface-variant">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>

                        {isLoggedIn && (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}
                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition hover:bg-md-primary-container/30 ${column.headerAccent}`}
                            >
                              <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
                              Move
                            </button>
                            <div
                              className={`absolute right-0 bottom-full z-10 mb-1 w-36 rounded-2xl border border-md-outline-variant/20 bg-md-surface-container-high shadow-xl shadow-md-primary/5 transition-all duration-200 origin-bottom ${
                                openDropdown === task.id
                                  ? 'scale-100 opacity-100'
                                  : 'pointer-events-none scale-95 opacity-0'
                              }`}
                            >
                              <div className="p-1.5">
                                {getAvailableStatuses(column.key).map((status) => {
                                  const target = columns.find((c) => c.key === status);
                                  return (
                                    <button
                                      key={status}
                                      onClick={() => updateStatus(task.id, status)}
                                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-md-on-surface transition hover:bg-md-surface-container-highest"
                                    >
                                      <span className={`material-symbols-outlined text-[16px] ${target?.headerAccent}`}>
                                        {target?.icon}
                                      </span>
                                      {status}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="rounded-[18px] bg-md-surface-container/50 p-6 text-center">
                      <span className="material-symbols-outlined mb-1 text-[28px] text-md-outline">inbox</span>
                      <p className="md-body-small text-md-on-surface-variant">No tasks yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
