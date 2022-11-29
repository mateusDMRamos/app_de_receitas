import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers';
import App from '../App';

describe('Testa o componente Header', () => {
  const profileIcon = 'profile-top-btn';
  const pageTitle = 'page-title';

  it('Verifica se os elementes são renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(profileIcon)).toBeInTheDocument();
    expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  });
});
