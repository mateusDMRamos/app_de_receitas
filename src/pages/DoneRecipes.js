import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

      setDoneRecipes(doneRecipesLocalStorage);
    }
  }, []);

  return (
    <div>
      <Header title="Done Recipes" searchIcon={ false } />
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
      { doneRecipes.length > 0
        && doneRecipes.map((recipe, index) => (
          <div key={ index }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }
            </p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
            >
              Compartilhar
            </button>
            {
              recipe.tags.map((tag) => (
                <span
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </span>
              ))
            }
          </div>
        ))}
    </div>
  );
}

export default DoneRecipes;
