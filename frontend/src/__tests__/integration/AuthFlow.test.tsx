// src/__tests__/integration/AuthFlow.test.tsx
/**
 * Tests d'intégration pour le flux d'authentification complet
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import * as utils from '@/lib/utils';
import * as auth from '@/lib/auth';

// Type pour les réponses d'API
interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

vi.mock('@/lib/utils', async () => {
  const actual = await vi.importActual('@/lib/utils');
  return {
    ...actual,
    fetchData: vi.fn(),
    mainUrl: 'http://localhost:3000',
  };
});

vi.mock('@/lib/auth', () => ({
  setAccessToken: vi.fn(),
  getAccessToken: vi.fn(),
  removeAccessToken: vi.fn(),
}));

describe('Auth Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete (window as unknown as Record<string, unknown>).location;
    (window as unknown as Record<string, unknown>).location = { href: '' };
  });

  describe("Scénario complet d'inscription", () => {
    it("devrait permettre à un utilisateur de s'inscrire et être redirigé", async () => {
      const mockResponse: ApiResponse<{ accessToken: string }> = {
        data: { accessToken: 'new-user-token-123' },
        error: null,
      };
      vi.mocked(utils.fetchData).mockResolvedValue(mockResponse);

      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>,
      );

      const nameInput = screen.getByPlaceholderText('Votre nom');
      const emailInput = screen.getByPlaceholderText('email@example.com');
      const passwordInput = screen.getByPlaceholderText('Minimum 6 caractères');

      fireEvent.change(nameInput, { target: { value: 'Jean Dupont' } });
      fireEvent.change(emailInput, { target: { value: 'jean@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'MotDePasse123!' } });

      const form = nameInput.closest('form')!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(utils.fetchData).toHaveBeenCalledWith(
          'http://localhost:3000/api/auth/register',
          'POST',
          {
            name: 'Jean Dupont',
            email: 'jean@example.com',
            password: 'MotDePasse123!',
          },
        );
      });

      expect(auth.setAccessToken).toHaveBeenCalledWith('new-user-token-123');
      expect(window.location.href).toBe('/');
    });

    it('devrait gérer les erreurs de validation', async () => {
      const mockResponse: ApiResponse<{ accessToken: string }> = {
        data: null,
        error: new Error('Le mot de passe doit contenir au moins 6 caractères'),
      };
      vi.mocked(utils.fetchData).mockResolvedValue(mockResponse);

      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>,
      );

      const submitButton = screen.getByRole('button', { name: "S'inscrire" });
      const form = submitButton.closest('form')!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(
          screen.getByText('Le mot de passe doit contenir au moins 6 caractères'),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Scénario complet de connexion', () => {
    it('devrait permettre à un utilisateur de se connecter avec succès', async () => {
      const mockResponse: ApiResponse<{ accessToken: string }> = {
        data: { accessToken: 'existing-user-token-456' },
        error: null,
      };
      vi.mocked(utils.fetchData).mockResolvedValue(mockResponse);

      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>,
      );

      const emailInput = screen.getByPlaceholderText('votre@email.com');
      const passwordInput = screen.getByPlaceholderText('Votre mot de passe');

      fireEvent.change(emailInput, { target: { value: 'jean@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: 'Se connecter' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(utils.fetchData).toHaveBeenCalledWith(
          'http://localhost:3000/api/auth/login',
          'POST',
          {
            email: 'jean@example.com',
            password: 'password123',
          },
        );
      });

      expect(auth.setAccessToken).toHaveBeenCalledWith('existing-user-token-456');
      expect(window.location.href).toBe('/');
    });

    it('devrait gérer les identifiants incorrects', async () => {
      const mockResponse: ApiResponse<{ accessToken: string }> = {
        data: null,
        error: new Error('Email ou mot de passe incorrect'),
      };
      vi.mocked(utils.fetchData).mockResolvedValue(mockResponse);

      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>,
      );

      const emailInput = screen.getByPlaceholderText('votre@email.com');
      const passwordInput = screen.getByPlaceholderText('Votre mot de passe');
      const submitButton = screen.getByRole('button', { name: 'Se connecter' });

      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email ou mot de passe incorrect')).toBeInTheDocument();
      });

      expect(auth.setAccessToken).not.toHaveBeenCalled();
      expect(window.location.href).toBe('');
    });
  });

  describe('Navigation entre Login et Register', () => {
    it('devrait pouvoir naviguer de Login vers Register', () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>,
      );

      const registerLink = screen.getByText("S'inscrire");
      expect(registerLink).toHaveAttribute('href', '/register');
    });

    it('devrait pouvoir naviguer de Register vers Login', () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>,
      );

      const loginLink = screen.getByText('Se connecter');
      expect(loginLink).toHaveAttribute('href', '/login');
    });
  });

  describe('États de chargement', () => {
    it('devrait désactiver le bouton pendant la soumission (Register)', async () => {
      vi.mocked(utils.fetchData).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>,
      );

      const submitButton = screen.getByRole('button', { name: "S'inscrire" });
      const form = submitButton.closest('form')!;

      fireEvent.submit(form);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Inscription...');
      });
    });

    it('devrait désactiver le bouton pendant la soumission (Login)', async () => {
      vi.mocked(utils.fetchData).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>,
      );

      const submitButton = screen.getByRole('button', { name: 'Se connecter' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Connexion...');
      });
    });
  });
});
