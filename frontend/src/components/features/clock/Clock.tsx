import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useClock } from '@/hooks/useClock';

export default function Clock() {
  const currentTime = useClock();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="s-title-m">🕒 Heure actuelle</CardTitle>
      </CardHeader>
      <CardContent>
        {currentTime ? (
          <div className="s-title-l s-text-center" data-testid="clock-time">
            {currentTime}
          </div>
        ) : (
          <Skeleton className="h-10 w-full" data-testid="clock-skeleton" />
        )}
      </CardContent>
    </Card>
  );
}
