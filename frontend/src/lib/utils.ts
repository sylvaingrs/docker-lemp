import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchData<T>(
  url: string,
  method: string,
  body?: any,
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (res.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Session expirée');
    }

    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    const apiData = await res.json();
    return { data: apiData, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error : Error('Unknow error') };
  }
}

export const url: string = (import.meta as any).env.VITE_API_URL;

export interface ResponseRegister {
  data: {
    message: string | null;
    token: string | null;
  } | null;
  error: Error | null;
}
