import { refreshAccessToken } from '@/lib/auth';
import { mainUrl } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      let token = localStorage.getItem('accessToken');

      if (!token) {
        token = await refreshAccessToken();

        if (!token) {
          window.location.href = '/login';
          return;
        }
      }

      try {
        const response = await fetch(`${mainUrl}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else if (response.status === 401) {
          const newToken = await refreshAccessToken();

          if (newToken) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
          }
        } else {
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        }
      } catch (e) {
        console.log('error:', e);
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
