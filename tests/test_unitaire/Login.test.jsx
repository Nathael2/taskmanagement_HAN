Login.tsx import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import Login from './Login';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

jest.mock('../contexts/AuthContext');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login - Tests unitaires', () => {
  const mockLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useAuth.mockReturnValue({
      login: mockLogin,
    });

    useNavigate.mockReturnValue(mockNavigate);
  });

  test("Permet de s'identifier avec les identifiants admin", async () => {
    mockLogin.mockResolvedValue({
      success: true,
    });

    render(<Login />);

    const emailInput = screen.getByLabelText('Email:');

    fireEvent.change(emailInput, {
      target: {
        value: 'admin@test.com',
      },
    });

    const passwordInput = screen.getByLabelText('Mot de passe:');

    fireEvent.change(passwordInput, {
      target: {
        value: 'password',
      },
    });

    expect(emailInput).toHaveValue('admin@test.com');
    expect(passwordInput).toHaveValue('password');

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Se connecter',
      })
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        'admin@test.com',
        'password'
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});