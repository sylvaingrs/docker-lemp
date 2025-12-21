// src/__tests__/components/UserList.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserList from '@/components/features/users/UserList';

describe('UserList', () => {
  const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  it('devrait afficher un skeleton pendant le chargement', () => {
    render(<UserList users={[]} loading={true} error={null} />);
    expect(screen.getByTestId('users-loading')).toBeInTheDocument();
  });

  it('devrait afficher une erreur', () => {
    const errorMessage = 'Erreur de chargement';
    render(<UserList users={[]} loading={false} error={errorMessage} />);

    expect(screen.getByTestId('users-error')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("devrait afficher un message quand il n'y a pas d'utilisateurs", () => {
    render(<UserList users={[]} loading={false} error={null} />);

    expect(screen.getByTestId('users-empty')).toBeInTheDocument();
    expect(screen.getByText('Aucun utilisateur trouvé')).toBeInTheDocument();
  });

  it('devrait afficher la liste des utilisateurs', () => {
    render(<UserList users={mockUsers} loading={false} error={null} />);

    expect(screen.getByTestId('users-list')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('devrait afficher les IDs des utilisateurs', () => {
    render(<UserList users={mockUsers} loading={false} error={null} />);

    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();
    expect(screen.getByText('#3')).toBeInTheDocument();
  });

  it('devrait avoir un data-testid unique pour chaque utilisateur', () => {
    render(<UserList users={mockUsers} loading={false} error={null} />);

    expect(screen.getByTestId('user-1')).toBeInTheDocument();
    expect(screen.getByTestId('user-2')).toBeInTheDocument();
    expect(screen.getByTestId('user-3')).toBeInTheDocument();
  });

  it('devrait afficher le titre et la description', () => {
    render(<UserList users={[]} loading={false} error={null} />);

    expect(screen.getByText('👥 Utilisateurs')).toBeInTheDocument();
    expect(screen.getByText('Liste des utilisateurs enregistrés')).toBeInTheDocument();
  });

  it('ne devrait pas afficher le skeleton si pas en chargement', () => {
    render(<UserList users={mockUsers} loading={false} error={null} />);

    expect(screen.queryByTestId('users-loading')).not.toBeInTheDocument();
  });

  it("ne devrait pas afficher l'erreur si pas d'erreur", () => {
    render(<UserList users={mockUsers} loading={false} error={null} />);

    expect(screen.queryByTestId('users-error')).not.toBeInTheDocument();
  });
});
