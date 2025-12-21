import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useApi } from '@/hooks/useApi';

describe('useApi', () => {
  it('devrait initialiser avec loading=false quand autoFetch=false', () => {
    const fetcher = vi.fn().mockResolvedValue({ data: 'test' });
    const { result } = renderHook(() => useApi(fetcher, false));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('devrait charger les données avec succès', async () => {
    const mockData = { id: 1, name: 'Test' };
    const fetcher = vi.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useApi(fetcher, false));

    await act(async () => {
      await result.current.execute();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });
  });

  it('devrait gérer les erreurs', async () => {
    const errorMessage = 'Erreur réseau';
    const fetcher = vi.fn().mockRejectedValue(new Error(errorMessage));
    const { result } = renderHook(() => useApi(fetcher, false));

    await act(async () => {
      await result.current.execute();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('devrait gérer les erreurs non-Error', async () => {
    const fetcher = vi.fn().mockRejectedValue('string error');
    const { result } = renderHook(() => useApi(fetcher, false));

    await act(async () => {
      await result.current.execute();
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Une erreur est survenue');
    });
  });

  it("devrait réinitialiser l'état", async () => {
    const mockData = { id: 1, name: 'Test' };
    const fetcher = vi.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useApi(fetcher, false));

    await act(async () => {
      await result.current.execute();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('devrait pouvoir être appelé plusieurs fois', async () => {
    let counter = 0;
    const fetcher = vi.fn().mockImplementation(() => {
      counter++;
      return Promise.resolve({ count: counter });
    });
    const { result } = renderHook(() => useApi(fetcher, false));

    await act(async () => {
      await result.current.execute();
    });
    await waitFor(() => expect(result.current.data).toEqual({ count: 1 }));

    await act(async () => {
      await result.current.execute();
    });
    await waitFor(() => expect(result.current.data).toEqual({ count: 2 }));

    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
