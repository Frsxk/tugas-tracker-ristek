import type { Tugas, MataKuliah, AuthResponse } from '@/types';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpiry', String(Date.now() + 24 * 60 * 60 * 1000)); // 24 hours
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiry');
};

const isTokenExpired = () => {
  const expiry = localStorage.getItem('tokenExpiry');
  return expiry ? Date.now() > Number(expiry) : true;
};

const statusMap = {
  toBackend: { 'Not Started': 'PENDING', 'In Progress': 'IN_PROGRESS', 'Completed': 'COMPLETED' },
  toFrontend: { 'PENDING': 'Not Started', 'IN_PROGRESS': 'In Progress', 'COMPLETED': 'Completed' }
} as const;

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const token = getToken();
  
  if (token && isTokenExpired()) {
    removeToken();
    localStorage.removeItem('user');
    toast.error('Session expired. Please login again.');
    window.location.href = '/login';
    throw new Error('Token expired');
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...options?.headers as Record<string, string> };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    if (res.status === 401) {
      removeToken();
      localStorage.removeItem('user');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `API error: ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  // Tugas
  getTugas: (): Promise<Tugas[]> => fetchAPI('/tugas'),
  getTugasById: (id: string): Promise<Tugas> => fetchAPI(`/tugas/${id}`),
  createTugas: (data: Partial<Tugas>) => fetchAPI('/tugas', { method: 'POST', body: JSON.stringify(data) }),
  updateTugas: (id: string, data: Partial<Tugas>) => fetchAPI(`/tugas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTugas: (id: string) => fetchAPI(`/tugas/${id}`, { method: 'DELETE' }),

  // MataKuliah
  getMataKuliah: (): Promise<MataKuliah[]> => fetchAPI('/matakuliah'),
  getMataKuliahById: (id: string): Promise<MataKuliah> => fetchAPI(`/matakuliah/${id}`),
  createMataKuliah: (data: Partial<MataKuliah>) => fetchAPI('/matakuliah', { method: 'POST', body: JSON.stringify(data) }),
  updateMataKuliah: (id: string, data: Partial<MataKuliah>) => fetchAPI(`/matakuliah/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMataKuliah: (id: string) => fetchAPI(`/matakuliah/${id}`, { method: 'DELETE' }),

  // Auth
  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    setToken(res.token);
    return res;
  },
  register: async (data: { email: string; password: string; name: string }): Promise<AuthResponse> => {
    const res = await fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(data) });
    setToken(res.token);
    return res;
  },
  logout: () => {
    removeToken();
    return fetchAPI('/auth/logout', { method: 'POST' });
  },
};

export { statusMap };
