import api from './api';
import toast from 'react-hot-toast';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
  role: 'host' | 'guest';
}

export const login = async ({ email, password }: LoginCredentials): Promise<void> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    toast.success('Welcome back!');
  } catch (error) {
    throw error;
  }
};

export const register = async ({ email, password, fullName, role }: RegisterCredentials): Promise<void> => {
  try {
    const response = await api.post('/auth/register', {
      email,
      password,
      fullName,
      role
    });
    toast.success('Registration successful! Please log in.');
    return response.data;
  } catch (error) {
    throw error;
  }
};