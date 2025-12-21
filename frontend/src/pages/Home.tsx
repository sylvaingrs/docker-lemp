import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserInfo, type UserInfo } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Clock from '@/components/features/clock/Clock';

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setUser(res);
      } catch (error) {
        console.error('Failed to load user info:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, []);

  return (
    <div className="s-container s-p-l s-flex s-flex-column s-gap-l">
      <div className="s-text-center">
        <h1 className="s-title-xl" data-testid="welcome-title">
          Bienvenue {loading ? '...' : user?.name || 'Invité'}
        </h1>
        <p className="s-text-regular">Bienvenue sur ton front React</p>
      </div>

      <Clock />

      <Card>
        <CardHeader>
          <CardTitle className="s-title-m">📅 Calendrier</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="s-round-m"
            data-testid="calendar"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="s-title-m">⏳ Exemple de squelette</CardTitle>
        </CardHeader>
        <CardContent className="s-flex s-flex-column s-gap-s">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
