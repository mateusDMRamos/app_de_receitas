import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers';

describe('Testa a página de login', () => {
  it('01 - Verifica se a página de login é renderizada com 2 inputs e 1 botão', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });
  it('02 - Verifica se o botão é rederizado desabilitado', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
  });
});
