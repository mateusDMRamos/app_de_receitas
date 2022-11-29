import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers';

describe('Testa a página de login', () => {
  const inputEmail = 'email-input';
  const inputPassword = 'password-input';
  const inputBtn = 'login-submit-btn';

  it('01 - Verifica se a página de login é renderizada com 2 inputs e 1 botão', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(inputEmail)).toBeInTheDocument();
    expect(screen.getByTestId(inputPassword)).toBeInTheDocument();
    expect(screen.getByTestId(inputBtn)).toBeInTheDocument();
  });

  it('02 - Verifica se o botão é rederizado desabilitado e habilita ao digitar a senha e o email correto', () => {
    renderWithRouter(<App />);

    const loginBtn = screen.getByTestId('login-submit-btn');
    expect(loginBtn).toBeDisabled();

    const loginPassword = screen.getByTestId(inputPassword);
    const loginEmail = screen.getByTestId(inputEmail);
    userEvent.type(loginEmail, 'teste@test.com');
    userEvent.type(loginPassword, '1234567');

    expect(loginBtn).not.toBeDisabled();
  });

  it('03 - Verifica se a página é redirecionada para o /meals', () => {
    const { history } = renderWithRouter(<App />);

    const loginBtn = screen.getByTestId(inputBtn);
    expect(loginBtn).toBeDisabled();

    const loginPassword = screen.getByTestId('password-input');
    const loginEmail = screen.getByTestId('email-input');
    userEvent.type(loginEmail, 'teste@test.com');
    userEvent.type(loginPassword, '1234567');

    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/meals');
  });
});
