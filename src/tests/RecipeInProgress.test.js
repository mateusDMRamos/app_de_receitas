import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers';
import { oneMeal, newOneMeal } from './mocks/mealsFetchMocks';
import { oneDrink } from './mocks/drinksFetchMocks';
import App from '../App';

describe('Testing RecipeInProgress page', () => {
  const urlMeals = '/meals/52771/in-progress';
  const idFinishButton = 'finish-recipe-btn';

  const oneMealFetch = () => Promise.resolve({
    json: () => Promise.resolve(oneMeal),
  });

  const newOneMealFetch = () => Promise.resolve({
    json: () => Promise.resolve(newOneMeal),
  });

  const oneDrinkFetch = () => Promise.resolve({
    json: () => Promise.resolve(oneDrink),
  });

  // const newOneDrinkFetch = () => Promise.resolve({
  //   json: () => Promise.resolve(newOneDrink),
  // });

  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementationOnce(oneMealFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  test('se a API correta, de meals é chamada', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(urlMeals);
    });
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52771}`);
  });
  test('se a API correta, de drinks é chamada', () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(oneDrinkFetch);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('drinks/178319/in-progress');
    });
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${178319}`);
  });
  test('se os checkboxs funcionam e o botão de finalizar habilita na pagina de Drinks', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(oneDrinkFetch);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('drinks/178319/in-progress');
    });
    const checkbox = await screen.findAllByRole('checkbox');
    const finishButton = screen.getByTestId(idFinishButton);
    expect(checkbox[0]).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();

    userEvent.click(checkbox[0]);
    userEvent.click(checkbox[1]);

    expect(finishButton).toBeDisabled();

    userEvent.click(checkbox[2]);

    expect(finishButton).not.toBeDisabled();

    userEvent.click(finishButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${178319}`);
  });
  test('se os checkboxs funcionam e o botão de finalizar habilita na pagina de Meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(urlMeals);
    });

    const checkbox = await screen.findAllByRole('checkbox');
    const finishButton = screen.getByTestId(idFinishButton);
    expect(checkbox[0]).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();

    checkbox.forEach((item) => {
      userEvent.click(item);
    });

    expect(finishButton).not.toBeDisabled();

    userEvent.click(finishButton);
  });
  test('Verifica se vai pra página /done-recipes a partir da página de Meals', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(newOneMealFetch);

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(urlMeals);
    });

    const checkbox = await screen.findAllByRole('checkbox');
    const finishButton = screen.getByTestId(idFinishButton);
    expect(checkbox[0]).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();

    // checkbox.forEach((item) => {
    //   userEvent.click(item);
    // });

    expect(finishButton).not.toBeDisabled();

    userEvent.click(finishButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
