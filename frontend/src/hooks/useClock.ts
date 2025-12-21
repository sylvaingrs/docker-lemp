import { useEffect, useState } from 'react';

export function useClock() {
  const formatTime = (date: Date) => date.toLocaleTimeString('fr-FR', { hour12: false });

  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
