import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchData<T>(
  url: string,
  params = {},
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const res = await fetch(url, params);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    const apiData: T = await res.json();
    return { data: apiData, error: null };
  } catch (error) {
    console.log(`Error caught : ${error}`);
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
