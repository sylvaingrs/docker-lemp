import { mainUrl } from './utils';

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
};

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const response = await fetch(`${mainUrl}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      clearAccessToken();
      return null;
    }

    const data = await response.json();
    setAccessToken(data.accessToken);

    return data.accessToken;
  } catch (error) {
    console.error('refreshAccessToken: Refresh error:', error);
    clearAccessToken();
    return null;
  }
}
