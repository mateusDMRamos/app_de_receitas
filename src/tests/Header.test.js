import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers';
import App from '../App';

describe('Testa o componente Header', () => {
  const profileIcon = 'profile-top-btn';
  const pageTitle = 'page-title';
  const searchIcon = 'search-top-btn';
  const searchInput = 'search-input';

  it('Verifica se os elementes são renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(profileIcon)).toBeInTheDocument();
    expect(screen.getByTestId(pageTitle)).toBeInTheDocument();
  });

  it('Verifica se o botão de pesquisa abre o campo para pesquisa', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
    expect(screen.getByTestId(searchIcon)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(searchIcon));

    const searchInputHeader = screen.getByTestId(searchInput);
    userEvent.type(searchInputHeader, 'rice');
    expect(searchInputHeader).toHaveValue('rice');
  });
});
