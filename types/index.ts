export interface Tugas {
  id: string;
  nama: string;
  deskripsi: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  deadline: string;
  mataKuliahId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  mataKuliah?: {
    id: string;
    nama: string;
    sks: number;
  };
}

export interface MataKuliah {
  id: string;
  nama: string;
  deskripsi: string;
  sks: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    tugas: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
