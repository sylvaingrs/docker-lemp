import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { refreshAccessToken } from './auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchData<T>(
  url: string,
  method: string,
  body?: any,
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const token = localStorage.getItem('accessToken');

    const res = await fetch(url, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (res.status === 401) {
      console.log('Access token expired, trying to refresh...');

      const newToken = await refreshAccessToken();

      if (!newToken) {
        window.location.href = '/login';
        throw new Error('Session expired');
      }

      const retryRes = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newToken}`,
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      if (!retryRes.ok) {
        throw new Error(`HTTP ${retryRes.status} - ${retryRes.statusText}`);
      }

      const retryData = await retryRes.json();
      return { data: retryData, error: null };
    }

    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

    const apiData = await res.json();
    return { data: apiData, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error : Error('Unknow error') };
  }
}

export const url: string = (import.meta as any).env.VITE_API_URL;

export interface ResponseRegisterAndLogin {
  data: {
    message: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  } | null;
  error: Error | null;
}
