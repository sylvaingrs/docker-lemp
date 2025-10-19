import { url } from './utils';

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await fetch(`${url}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      localStorage.removeItem('accessToken');
      return null;
    }

    const data = await response.json();

    localStorage.setItem('accessToken', data.accessToken);

    return data.accessToken;
  } catch (error) {
    console.error('refreshAccessToken: Refresh error:', error);
    localStorage.removeItem('accessToken');
    return null;
  }
}
