import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers';

const TEST_EMAIL = 'teste@email.com';
const PASSWORD = '1234567';
const inputEmail = 'email-input';
const inputPassword = 'password-input';
const inputBtn = 'login-submit-btn';
const profileTopBtn = 'profile-top-btn';
const emailRenderTestId = 'profile-email';

describe('Testa a página de perfil', () => {
  it('Verifica a renderização do email na /profile', async () => {
    const { history } = renderWithRouter(<App />);
    const inputEmailLogin = screen.getByTestId(inputEmail);
    const inputPasswordLogin = screen.getByTestId(inputPassword);
    const inputBtnLogin = screen.getByTestId(inputBtn);

    userEvent.type(inputEmailLogin, TEST_EMAIL);
    userEvent.type(inputPasswordLogin, PASSWORD);
    userEvent.click(inputBtnLogin);

    const profileBtnHeader = await screen.getByTestId(profileTopBtn);
    expect(profileBtnHeader).toBeInTheDocument();
    userEvent.click(profileBtnHeader);

    const emailProfileRender = await screen.getByTestId(emailRenderTestId);
    expect(emailProfileRender).toBeInTheDocument();
    expect(history.location.pathname).toBe('/profile');
  });
  it('Verifica o botão de logout', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/profile'); });
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
  });
});
