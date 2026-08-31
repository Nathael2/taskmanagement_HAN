import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../contexts/AuthContext';
jest.mock('../contexts/AuthContext');
jest.mock('react-router-dom', () => ({
  Navigate: ({ to }) => (
    <div data-testid="navigate">
      Redirection vers {to}
    </div>
  ),
}));
describe('PrivateRoute - Tests unitaires', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('affiche le message de chargement lorsque loading est true', () => {
    useAuth.mockReturnValue({
      token: null,
      loading: true,
    });
render(
      <PrivateRoute>
        <div>Contenu privé</div>
      </PrivateRoute>
    );
    expect(
      screen.getByText('Chargement...')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Contenu privé')
    ).not.toBeInTheDocument();
  });
  test('affiche le contenu lorsque l’utilisateur est authentifié', () => {
    useAuth.mockReturnValue({
      token: 'fake-token',
      loading: false,
    });
render(
      <PrivateRoute>
        <div>Contenu privé</div>
      </PrivateRoute>
    );
    expect(
      screen.getByText('Contenu privé')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Chargement...')
    ).not.toBeInTheDocument();
  });
  test('redirige vers /login lorsque l’utilisateur n’est pas authentifié', () => {
    useAuth.mockReturnValue({
      token: null,
      loading: false,
    });
    render(
      <PrivateRoute>
        <div>Contenu privé</div>
      </PrivateRoute>
    );
    expect(
      screen.getByTestId('navigate')
    ).toHaveTextContent('Redirection vers /login');
    expect(
      screen.queryByText('Contenu privé')
    ).not.toBeInTheDocument();
  });
  test('ne redirige pas lorsque le token est présent', () => {
    useAuth.mockReturnValue({
      token: 'fake-token',
      loading: false,
    });
    render(
      <PrivateRoute>
        <div>Dashboard</div>
      </PrivateRoute>
    );
    expect(
      screen.queryByTestId('navigate')
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('Dashboard')
    ).toBeInTheDocument();
  });
  test('redirige lorsque le token est absent', () => {
    useAuth.mockReturnValue({
      token: undefined,
      loading: false,
    });
    render(
      <PrivateRoute>
        <div>Dashboard</div>
      </PrivateRoute>
    );
    expect(
      screen.getByTestId('navigate')
    ).toHaveTextContent('/login');
    expect(
      screen.queryByText('Dashboard')
    ).not.toBeInTheDocument();
  });
});