import { url } from './utils';

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  console.log('refresh token : ', refreshToken);
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${url}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    }

    const data = await response.json();

    localStorage.setItem('accessToken', data.accessToken);

    return data.accessToken;
  } catch (error) {
    console.error('Refresh error:', error);
    return null;
  }
}
