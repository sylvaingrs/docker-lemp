import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export interface User {
  id: number;
  name: string;
}

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
}

export default function UserList({ users, loading, error }: UserListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="s-title-m">👥 Utilisateurs</CardTitle>
        <CardDescription>Liste des utilisateurs enregistrés</CardDescription>
      </CardHeader>

      <CardContent>
        {loading && (
          <div className="s-flex s-flex-column s-gap-s" data-testid="users-loading">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" data-testid="users-error">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="s-text-regular" data-testid="users-empty">
            Aucun utilisateur trouvé
          </p>
        )}

        {!loading && !error && users.length > 0 && (
          <ul className="s-flex s-flex-column s-gap-s" data-testid="users-list">
            {users.map((user) => (
              <li
                key={user.id}
                className="s-p-m s-round-m s-bg-gray s-flex s-space-between"
                data-testid={`user-${user.id}`}
              >
                <span className="s-text-semibold">{user.name}</span>
                <span className="s-text-regular">#{user.id}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
