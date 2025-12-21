import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClock } from '@/hooks/useClock';

describe('useClock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("devrait initialiser avec l'heure actuelle", () => {
    vi.setSystemTime(new Date('2024-01-15T14:30:45'));

    const { result } = renderHook(() => useClock());

    expect(result.current).toBe('14:30:45');
  });

  it("devrait mettre à jour l'heure chaque seconde", () => {
    vi.setSystemTime(new Date('2024-01-15T14:30:45'));

    const { result } = renderHook(() => useClock());

    act(() => {
      vi.advanceTimersByTime(1000);
      vi.setSystemTime(new Date('2024-01-15T14:30:46'));
    });

    expect(result.current).toBe('14:30:46');
  });

  it("devrait nettoyer l'interval au démontage", () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() => useClock());

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
