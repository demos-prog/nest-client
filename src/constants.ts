// export const API_URL = 'https://nest-task-4qc7.onrender.com';
export const API_URL = 'http://localhost:3000';

export interface User {
  email: string,
  password: string,
  role: 'user' | 'admin'
}