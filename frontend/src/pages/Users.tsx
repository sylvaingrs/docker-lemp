import UserList, { type User } from '@/components/features/users/UserList';
import { fetchData, mainUrl } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await fetchData<User[]>(`${mainUrl}/api/users`, 'GET');
        if (error) {
          setError(error.message);
        } else if (data) {
          setUsers(data);
        }
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="s-container s-p-l">
      <UserList users={users} loading={loading} error={error} />
    </div>
  );
}
