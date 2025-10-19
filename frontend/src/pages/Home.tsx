import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container p-l space-y-l">
      <div className="text-center">
        <h1 className="title-xl">🏠 Accueil</h1>
        <p className="text-gray-600">Bienvenue sur ton front React connecté à ton API Node.js.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="title-m">🕒 Heure actuelle</CardTitle>
        </CardHeader>
        <CardContent>
          {currentTime ? (
            <div className="title-l text-center">{currentTime}</div>
          ) : (
            <Skeleton className="h-10 w-full" />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="title-m">📅 Calendrier</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="title-m">⏳ Chargement (exemple)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-s">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
