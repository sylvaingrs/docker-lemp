import React, { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } catch (e) {
        console.log('error : ', e);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
