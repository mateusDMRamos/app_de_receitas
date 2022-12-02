import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers';
import mealsCategoriesMock from './mocks/mealsCategoriesMock';
import drinksCategoriesMock from './mocks/drinksCategoriesMock';
import { allMeals, oneMeal } from './mocks/mealsFetchMocks';
import { allDrinks, oneDrink } from './mocks/drinksFetchMocks';

const TEST_EMAIL = 'teste@email.com';
const PASSWORD = '1234567';
const inputEmail = 'email-input';
const inputPassword = 'password-input';
const inputBtn = 'login-submit-btn';
const allMealsFetch = () => Promise.resolve({
  json: () => Promise.resolve(allMeals),
});
const allDrinksFetch = () => Promise.resolve({
  json: () => Promise.resolve(allDrinks),
});
const mealCategoriesFetch = () => Promise.resolve({
  json: () => Promise.resolve(mealsCategoriesMock),
});
const drinkCategoriesFetch = () => Promise.resolve({
  json: () => Promise.resolve(drinksCategoriesMock),
});

describe('Testa o componente Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementationOnce(allMealsFetch)
      .mockImplementationOnce(mealCategoriesFetch)
      .mockImplementationOnce(allDrinksFetch)
      .mockImplementationOnce(drinkCategoriesFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('01 - Testa se as categorias e cards de comida sao renderizadas na tela e se a página muda ao clicar no card da comida', async () => {
    const { history } = renderWithRouter(<App />);
    const inputEmailLogin = screen.getByTestId(inputEmail);
    const inputPasswordLogin = screen.getByTestId(inputPassword);
    const inputBtnLogin = screen.getByTestId(inputBtn);

    userEvent.type(inputEmailLogin, TEST_EMAIL);
    userEvent.type(inputPasswordLogin, PASSWORD);
    userEvent.click(inputBtnLogin);
    expect(history.location.pathname).toBe('/meals');
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const chickenCategory = await screen.findByRole('button', { name: 'Chicken' });
    const corbaCard = await screen.findByText('Corba');
    expect(chickenCategory).toBeInTheDocument();
    expect(corbaCard).toBeInTheDocument();
    userEvent.click(corbaCard);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('02 - Testa se as categorias e cards de drinks sao renderizadas na tela após mudança de página e se a página muda ao clicar no card de uma bebida', async () => {
    const { history } = renderWithRouter(<App />);
    const inputEmailLogin = screen.getByTestId(inputEmail);
    const inputPasswordLogin = screen.getByTestId(inputPassword);
    const inputBtnLogin = screen.getByTestId(inputBtn);

    userEvent.type(inputEmailLogin, TEST_EMAIL);
    userEvent.type(inputPasswordLogin, PASSWORD);
    userEvent.click(inputBtnLogin);
    expect(history.location.pathname).toBe('/meals');
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const drinkBtn = await screen.findByAltText('Drink Icon');
    userEvent.click(drinkBtn);
    expect(global.fetch).toHaveBeenCalledTimes(4);
    const ggCard = await screen.findByText('GG');
    expect(ggCard).toBeInTheDocument();
    userEvent.click(ggCard);
    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('03 - Testa se a página de Recipes redireciona o usuário direto para a página de detalhes caso seja encontrada apenas uma receita', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));
    const { history } = renderWithRouter(<App />);

    const inputEmailLogin = screen.getByTestId(inputEmail);
    const inputPasswordLogin = screen.getByTestId(inputPassword);
    const inputBtnLogin = screen.getByTestId(inputBtn);

    userEvent.type(inputEmailLogin, TEST_EMAIL);
    userEvent.type(inputPasswordLogin, PASSWORD);
    userEvent.click(inputBtnLogin);
    expect(history.location.pathname).toBe('/meals');

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });
  it('04 - Testa se apagina de drinks redireciona para a pagina de detalhes quando apenas uma bebida é encontrada', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(allMealsFetch)
      .mockImplementationOnce(mealCategoriesFetch)
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(oneDrink),
      }))
      .mockImplementationOnce(drinkCategoriesFetch);

    const { history } = renderWithRouter(<App />);
    const inputEmailLogin = screen.getByTestId(inputEmail);
    const inputPasswordLogin = screen.getByTestId(inputPassword);
    const inputBtnLogin = screen.getByTestId(inputBtn);

    userEvent.type(inputEmailLogin, TEST_EMAIL);
    userEvent.type(inputPasswordLogin, PASSWORD);
    userEvent.click(inputBtnLogin);
    expect(history.location.pathname).toBe('/meals');
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const drinkBtn = await screen.findByAltText('Drink Icon');
    userEvent.click(drinkBtn);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'));
  });
  it('05 - Testa se o alerta é disparado caso não seja encontrada nenhuma bebida', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({}),
      }))
      .mockImplementationOnce(mealCategoriesFetch);
    const { history } = renderWithRouter(<App />);
    global.alert = jest.fn(() => {});

    const inputEmailLogin = screen.getByTestId(inputEmail);
    const inputPasswordLogin = screen.getByTestId(inputPassword);
    const inputBtnLogin = screen.getByTestId(inputBtn);

    userEvent.type(inputEmailLogin, TEST_EMAIL);
    userEvent.type(inputPasswordLogin, PASSWORD);
    userEvent.click(inputBtnLogin);
    expect(history.location.pathname).toBe('/meals');

    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});
