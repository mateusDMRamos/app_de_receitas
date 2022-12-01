import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers';
import userEvent from '@testing-library/user-event';
import mealsCategoriesMock from './mocks/mealsCategoriesMock';

const TEST_EMAIL = 'teste@email.com';
const PASSWORD = '1234567';
const inputEmail = 'email-input';
const inputPassword = 'password-input';
const inputBtn = 'login-submit-btn';

describe('Testa o componente searchBar na Página Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealsCategoriesMock),
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Testa se as categorias de comida sao renderizadas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmailLogin = screen.getByTestId(inputEmail);
    const inputPasswordLogin = screen.getByTestId(inputPassword);
    const inputBtnLogin = screen.getByTestId(inputBtn);

    userEvent.type(inputEmailLogin, TEST_EMAIL);
    userEvent.type(inputPasswordLogin, PASSWORD);
    userEvent.click(inputBtnLogin);
    expect(history.location.pathname).toBe('/meals');

    const chickenCategory = screen.getByRole('button', { name: 'Chicken' });
    expect(chickenCategory).toBeInTheDocument();
  });
});
