import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers';

describe('Testa o componente FavoriteRecipes', () => {
  it('01 - Testa se os botões estão sendo renderizados', async () => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('favoriteRecipes', '[{"id":"52977","type":"meal","nationality":"Turkish","category":"Side","alcoholicOrNot":"","name":"Corba","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"},{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"}]');
    act(() => {
      history.push('/favorite-recipes');
    });

    expect(screen.getByText('Meals')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();

    localStorage.clear();
  });

  it('02 - Testa se a pagina é renderizada sem favoritos', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/favorite-recipes');
    });

    expect(screen.queryByTestId('0-horizontal-image')).not.toBeInTheDocument();
  });
});
