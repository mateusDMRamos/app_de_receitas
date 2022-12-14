import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';

function FavoriteBtn() {
  const { details } = useContext(recipesContext);

  const saveFavoriteInLocalStorage = (favorite) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, favorite]));
    }
  };

  const newFavoriteMeal = () => {
    const newRecipe = {
      id: details.idMeal,
      type: 'meal',
      nationality: details.strArea === null ? '' : details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
    };
    saveFavoriteInLocalStorage(newRecipe);
  };

  const newFavoriteDrink = () => {
    const newRecipe = {
      id: details.idDrink,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };
    saveFavoriteInLocalStorage(newRecipe);
  };

  const handleFavorite = () => {
    if (window.location.href.includes('meals')) {
      newFavoriteMeal();
    } else {
      newFavoriteDrink();
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
      >
        Favoritar
      </button>
    </div>
  );
}

export default FavoriteBtn;
