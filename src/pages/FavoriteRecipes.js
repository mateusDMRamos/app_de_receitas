import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShareButton from '../components/ShareBtn';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favRecipesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(favRecipesLocalStorage);
    }
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" searchIcon={ false } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      { favoriteRecipes.length > 0
        && favoriteRecipes.map((recipe, index) => (
          <div key={ index }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {
                recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot} - ${recipe.category}`
              }
            </p>
            <ShareButton
              detailsPage={ false }
              type={ recipe.type }
              id={ recipe.id }
              index={ index }
            />
            <button
              type="button"
            >
              <img
                src={ blackHeartIcon }
                alt="favorite icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
        ))}
    </div>
  );
}

export default FavoriteRecipes;
