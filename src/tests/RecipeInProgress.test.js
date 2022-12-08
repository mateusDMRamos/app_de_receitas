import React from 'react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers';
import { oneMeal } from './mocks/mealsFetchMocks';
import App from '../App';

describe('Testing RecipeInProgress page', () => {
  const oneMealFetch = () => Promise.resolve({
    json: () => Promise.resolve(oneMeal),
  });

  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementationOnce(oneMealFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });
  test('se a API correta é chamada', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52771/in-progress');
    });
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52771}`);
  });
});
