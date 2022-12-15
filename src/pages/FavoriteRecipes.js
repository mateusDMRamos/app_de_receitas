import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const favRecipesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favRecipesLocalStorage) {
        setFavoriteRecipes(favRecipesLocalStorage);
      }
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
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
            >
              Compartilhar
            </button>
          </div>
        ))}
    </div>
  );
}

export default FavoriteRecipes;
