import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers';
import App from '../App';

const TEST_EMAIL = 'teste@email.com';
const PASSWORD = '1234567';
const inputEmail = 'email-input';
const inputPassword = 'password-input';
const inputBtn = 'login-submit-btn';
const submitButtonSearch = 'exec-search-btn';
const searchIcon = 'search-top-btn';
const searcInputHeader = 'search-input';

describe('Testa o componente searchBar na Página Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  it('Verifica se os elementos são renderizados', async () => {
    const { history } = renderWithRouter(<App />);
    const inputEmailLogin = screen.getByTestId(inputEmail);
    const inputPasswordLogin = screen.getByTestId(inputPassword);
    const inputBtnLogin = screen.getByTestId(inputBtn);

    userEvent.type(inputEmailLogin, TEST_EMAIL);
    userEvent.type(inputPasswordLogin, PASSWORD);
    userEvent.click(inputBtnLogin);

    const mealsTitle = await screen.getByTestId('page-title');
    const ingredientRadio = await screen.getByTestId('ingredient-search-radio');
    const nameRadio = await screen.getByTestId('name-search-radio');
    const firstLetterRadio = await screen.getByTestId('first-letter-search-radio');
    const searchButton = await screen.getByTestId(submitButtonSearch);
    const drinkButton = await screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinkButton);

    await expect(history.location.pathname).toBe('/drinks');
    expect(mealsTitle).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it('Verifica se os radioButton ingredient funciona', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchIconHeader = screen.getByTestId(searchIcon);

    userEvent.click(searchIconHeader);

    const searchInputHeader = screen.getByTestId(searcInputHeader);

    userEvent.type(searchInputHeader, 'rice');
    expect(searchInputHeader).toHaveValue('rice');

    userEvent.click(ingredientRadio);
    const searchButton = screen.getByTestId(submitButtonSearch);
    userEvent.click(searchButton);
  });

  it('Verifica se os radioButton name funciona', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });

    const nameRadio = screen.getByTestId('name-search-radio');
    const searchIconHeader = screen.getByTestId(searchIcon);

    userEvent.click(searchIconHeader);

    const searchInputHeader = screen.getByTestId(searcInputHeader);

    userEvent.type(searchInputHeader, 'rice');
    expect(searchInputHeader).toHaveValue('rice');

    userEvent.click(nameRadio);
    const searchButton = screen.getByTestId(submitButtonSearch);
    userEvent.click(searchButton);
  });

  it('Verifica se os radioButton firstLetter funciona', () => {
    global.alert = jest.fn(() => {});

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });

    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchIconHeader = screen.getByTestId(searchIcon);

    userEvent.click(searchIconHeader);

    const searchInputHeader = screen.getByTestId(searcInputHeader);

    userEvent.type(searchInputHeader, 'r');

    userEvent.click(firstLetterRadio);
    const searchButton = screen.getByTestId(submitButtonSearch);
    userEvent.click(searchButton);

    userEvent.type(searchInputHeader, 'i');
    userEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  it('Verifica se os radioButton name funciona', () => {
    global.alert = jest.fn(() => {});

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });

    const searchIconHeader = screen.getByTestId(searchIcon);

    userEvent.click(searchIconHeader);

    const searchInputHeader = screen.getByTestId(searcInputHeader);

    userEvent.type(searchInputHeader, 'rice');

    const searchButton = screen.getByTestId(submitButtonSearch);
    userEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  });
});
