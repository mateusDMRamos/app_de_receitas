import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers';
import App from '../App';
import { allMeals, oneMeal } from './mocks/mealsFetchMocks';
import { allDrinks } from './mocks/drinksFetchMocks';
import mealsCategoriesMocks from './mocks/mealsCategoriesMock';

const TEST_EMAIL = 'teste@email.com';
const PASSWORD = '1234567';
const inputEmail = 'email-input';
const inputPassword = 'password-input';
const inputBtn = 'login-submit-btn';
const submitButtonSearch = 'exec-search-btn';
const searchIcon = 'search-top-btn';
const searcInputHeader = 'search-input';
const ingredientRadioBtn = 'ingredient-search-radio';

const allMealsFetch = () => Promise.resolve({
  json: () => Promise.resolve(allMeals),
});

const mealCategoriesFetch = () => Promise.resolve({
  json: () => Promise.resolve(mealsCategoriesMocks),
});

const oneMealFetch = () => Promise.resolve({
  json: () => Promise.resolve(oneMeal),
});

const allDrinksFetch = () => Promise.resolve({
  json: () => Promise.resolve(allDrinks),
});

describe('Testa o componente SearchBar na tela Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementationOnce(allMealsFetch)
      .mockImplementationOnce(mealCategoriesFetch)
      .mockImplementationOnce(oneMealFetch);
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

    const mealsTitle = screen.getByTestId('page-title');
    const ingredientRadio = screen.getByTestId(ingredientRadioBtn);
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId(submitButtonSearch);

    expect(history.location.pathname).toBe('/meals');
    expect(mealsTitle).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it('Verifica se os radioButton ingredient funciona', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const ingredientRadio = screen.getByTestId(ingredientRadioBtn);
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
      history.push('/meals');
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
      history.push('/meals');
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
  it('Verifica se os radioButton name funciona', async () => {
    const { history } = renderWithRouter(<App />);
    global.alert = jest.fn(() => {});

    act(() => {
      history.push('/meals');
    });

    const searchIconHeader = screen.getByTestId(searchIcon);

    userEvent.click(searchIconHeader);

    const searchInputHeader = screen.getByTestId(searcInputHeader);

    userEvent.type(searchInputHeader, 'Feijão');

    const ingredientRadio = screen.getByTestId(ingredientRadioBtn);

    userEvent.click(ingredientRadio);

    const searchButton = screen.getByTestId(submitButtonSearch);
    userEvent.click(searchButton);
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
  });
  test('Verifica se encaminha para página details se houver somente uma resposta na pesquisa.', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(allMealsFetch)
      .mockImplementationOnce(mealCategoriesFetch)
      .mockImplementationOnce(oneMealFetch)
      .mockImplementationOnce(allDrinksFetch);

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchIconHeader = screen.getByTestId(searchIcon);
    userEvent.click(searchIconHeader);

    const searchInputHeader = screen.getByTestId(searcInputHeader);
    expect(searchInputHeader).toBeInTheDocument();
    userEvent.type(searchInputHeader, 'penne rigate');

    const ingredientRadio = screen.getByTestId(ingredientRadioBtn);
    userEvent.click(ingredientRadio);

    const searchButton = screen.getByTestId(submitButtonSearch);
    userEvent.click(searchButton);

    // await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));

    // const categoryButton = await screen.findByRole('button', { name: /goat/i });
    // expect(categoryButton).toBeInTheDocument();

    // debug;

    // expect(global.fetch).toHaveBeenCalledTimes(4);
    // const recipeTitle = await screen.findByTestId('recipe-title');
    // expect(recipeTitle).toBeInTheDocument();
  });
});
