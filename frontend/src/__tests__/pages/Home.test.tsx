import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages/Home';
import * as utils from '@/lib/utils';

vi.mock('@/lib/utils', async () => {
  const actual = await vi.importActual('@/lib/utils');
  return {
    ...actual,
    getUserInfo: vi.fn(),
  };
});

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("devrait afficher le message de bienvenue avec le nom d'utilisateur", async () => {
    const mockDate = new Date('2024-01-15T14:30:45');
    vi.setSystemTime(mockDate);

    const mockUser = { id: 1, name: 'Alice', email: 'alice@test.com' };
    vi.mocked(utils.getUserInfo).mockResolvedValue(mockUser);

    render(<Home />);

    await waitFor(
      () => {
        expect(screen.getByTestId('welcome-title')).toHaveTextContent('Bienvenue Alice');
      },
      { timeout: 3000 },
    );
  });

  it('devrait afficher "..." pendant le chargement', () => {
    vi.mocked(utils.getUserInfo).mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    render(<Home />);

    expect(screen.getByTestId('welcome-title')).toHaveTextContent('Bienvenue ...');
  });

  it('devrait afficher "Invité" en cas d\'erreur', async () => {
    vi.mocked(utils.getUserInfo).mockRejectedValue(new Error('API error'));

    render(<Home />);

    await waitFor(
      () => {
        expect(screen.getByTestId('welcome-title')).toHaveTextContent('Bienvenue Invité');
      },
      { timeout: 3000 },
    );
  });

  it('devrait afficher le composant Clock', () => {
    const mockDate = new Date('2024-01-15T14:30:45');
    vi.setSystemTime(mockDate);

    vi.mocked(utils.getUserInfo).mockResolvedValue({ id: 2, name: 'Test', email: 'test@test.com' });

    render(<Home />);

    expect(screen.getByText('🕒 Heure actuelle')).toBeInTheDocument();
  });

  it('devrait afficher le calendrier', () => {
    vi.mocked(utils.getUserInfo).mockResolvedValue({ id: 2, name: 'Test', email: 'test@test.com' });

    render(<Home />);

    expect(screen.getByText('📅 Calendrier')).toBeInTheDocument();
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it("devrait afficher les skeletons d'exemple", () => {
    vi.mocked(utils.getUserInfo).mockResolvedValue({ id: 2, name: 'Test', email: 'test@test.com' });

    render(<Home />);

    expect(screen.getByText('⏳ Exemple de squelette')).toBeInTheDocument();
  });

  it("devrait afficher le message d'accueil", () => {
    vi.mocked(utils.getUserInfo).mockResolvedValue({ id: 2, name: 'Test', email: 'test@test.com' });

    render(<Home />);

    expect(
      screen.getByText('Bienvenue sur ton front React connecté à ton API Node.js.'),
    ).toBeInTheDocument();
  });
});
