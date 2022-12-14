import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers';
import { allMeals, oneMeal } from './mocks/mealsFetchMocks';
import { allDrinks, oneDrink } from './mocks/drinksFetchMocks';

const allMealsFetch = () => Promise.resolve({
  json: () => Promise.resolve(allMeals),
});

const oneDrinkFetch = () => Promise.resolve({
  json: () => Promise.resolve(oneDrink),
});

const oneMealFetch = () => Promise.resolve({
  json: () => Promise.resolve(oneMeal),
});

const allDrinksFetch = () => Promise.resolve({
  json: () => Promise.resolve(allDrinks),
});

const urlDrinks = '/drinks/15997';
const urlMeals = 'meals/52977';
const continueBtn = 'Continue Recipe';

describe('Testa o componente RecipeDetails', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementationOnce(allMealsFetch)
      .mockImplementationOnce(oneDrinkFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('01 - Testa entrada em páginas de detalhes de uma bebida', async () => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('inProgressRecipes', '{"drinks":{"15997":[]},"meals":{"52977":[],"undefined":[]}}');
    act(() => {
      history.push(urlDrinks);
    });

    const continueButton = await screen.findByText(continueBtn);
    expect(continueButton).toBeInTheDocument();

    localStorage.clear();
  });

  it('02 - Testa se a bebida foi para o Local Storage', async () => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('doneRecipes', '[{ "id": "15997" }]');
    act(() => {
      history.push(urlDrinks);
    });

    const continueButton = screen.queryByText(continueBtn);
    expect(continueButton).not.toBeInTheDocument();
  });

  it('03 - Testa se a comida foi para o Local Storage', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(allDrinksFetch)
      .mockImplementationOnce(oneMealFetch);

    const { history } = renderWithRouter(<App />);

    localStorage.setItem('inProgressRecipes', '{"drinks":{"15997":[]},"meals":{"52977":[],"undefined":[]}}');
    act(() => {
      history.push(urlMeals);
    });

    const continueButton = await screen.findByText(continueBtn);
    expect(continueButton).toBeInTheDocument();

    localStorage.clear();
  });
});
