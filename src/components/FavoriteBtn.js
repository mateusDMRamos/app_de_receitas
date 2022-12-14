import React, { useContext, useEffect, useState } from 'react';
import recipesContext from '../context/recipesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn() {
  const { details } = useContext(recipesContext);
  const [favoriteFood, setFavoriteFood] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      if (url.includes('meals')) {
        const validateFavorite = favorites
          .some((favorite) => (favorite.id === details.idMeal));
        setFavoriteFood(validateFavorite);
      } else {
        const validateFavorite = favorites
          .some((favorite) => (favorite.id === details.idDrink));
        setFavoriteFood(validateFavorite);
      }
    }
  }, [details.idMeal, details.idDrink]);

  const saveFavoriteInLocalStorage = (favorite) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, favorite]));
    }
    setFavoriteFood(true);
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

  const validateFavoriteList = (url) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      if (url.includes('meals')) {
        const validateFavorite = favorites
          .some((favorite) => (favorite.id === details.idMeal));
        return validateFavorite;
      }
      const validateFavorite = favorites
        .some((favorite) => (favorite.id === details.idDrink));
      return validateFavorite;
    }
    return false;
  };

  const handleFavorite = () => {
    const url = window.location.href;
    const isFavorite = validateFavoriteList(url);
    if (url.includes('meals') && !isFavorite) {
      newFavoriteMeal();
    } else if (url.includes('drinks') && !isFavorite) {
      newFavoriteDrink();
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          src={ favoriteFood ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
          data-testid="favorite-btn"
        />
      </button>
    </div>
  );
}

export default FavoriteBtn;
