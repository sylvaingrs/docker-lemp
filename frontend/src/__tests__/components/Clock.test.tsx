import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Clock from '@/components/features/clock/Clock';

describe('Clock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("devrait afficher l'heure après l'initialisation", () => {
    vi.setSystemTime(new Date('2024-01-15T14:30:45'));

    render(<Clock />);

    expect(screen.getByTestId('clock-time')).toHaveTextContent('14:30:45');
  });

  it("devrait mettre à jour l'heure chaque seconde", () => {
    vi.setSystemTime(new Date('2024-01-15T14:30:45'));

    render(<Clock />);

    act(() => {
      vi.advanceTimersByTime(1000);
      vi.setSystemTime(new Date('2024-01-15T14:30:46'));
    });

    expect(screen.getByTestId('clock-time')).toHaveTextContent('14:30:46');
  });
});
