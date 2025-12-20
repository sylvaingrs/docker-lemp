import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getAccessToken, refreshAccessToken } from './auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchData<T>(
  url: string,
  method: string,
  body?: unknown,
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const token = getAccessToken();

    const options: RequestInit = {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    let res = await fetch(url, options);

    if (res.status === 401) {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        window.location.href = '/login';
        throw new Error('Session expired');
      }

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };

      res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      }

      return { data: await res.json(), error: null };
    }

    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

    const apiData = await res.json();
    return { data: apiData, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error : Error('Unknow error') };
  }
}
export const mainUrl: string =
  process.env.NODE_ENV === 'production' ? 'https://api.sylvain-nas.ovh' : 'http://localhost:3000';

export interface ResponseRegisterAndLogin {
  data: {
    message: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  } | null;
  error: Error | null;
}

export type UserInfo = {
  id: number;
  name: string;
  email: string;
};

export async function getUserInfo(): Promise<UserInfo> {
  const { data, error } = await fetchData<UserInfo>(`${mainUrl}/api/me`, 'GET');

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('No user data returned');
  }

  return data;
}
