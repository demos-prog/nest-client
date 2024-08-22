export const API_URL = 'https://nest-task-4qc7.onrender.com';
export const CLIENT_URL = 'https://nest-client-orpin.vercel.app';
// export const API_URL = 'http://localhost:3000';
// export const CLIENT_URL = 'http://localhost:5173';

export interface User {
  email: string,
  password: string,
  role: 'user' | 'admin'
  id?: number,
  createdAt?: string,
  updatedAt?: string,
}

export interface Post {
  id: number,
  title: string,
  content: string,
  userId: number,
  createdAt: string,
  updatedAt: string,
}

export interface PostDTO {
  title: string,
  content: string,
  userId: number,
}