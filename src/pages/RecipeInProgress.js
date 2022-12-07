import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';

function RecipeInProgress({ history: { location: { pathname } } }) {
  const { details } = useContext(recipesContext);
  return (
    <div>
      <Header title="Recipe In Progress" searchIcon={ false } />
      {
        pathname.includes('meals')
          ? (
            <div>
              <h1
                data-testid="recipe-title"
              >
                {details.strMeal}
              </h1>
              <h6 data-testid="recipe-category">
                {details.strCategory}
              </h6>
              <img
                src={ details.strMealThumb }
                alt={ details.strMeal }
                data-testid="recipe-photo"
              />
              <p data-testid="instructions">
                {details.strInstructions}
              </p>
              <button type="button" data-testid="share-btn">
                Compartilhar
              </button>
              <button type="button" data-testid="favorite-btn">
                Favoritar
              </button>
              <button type="button" data-testid="finish-recipe-btn">
                Finalizar
              </button>
            </div>
          )
          : (
            <div>
              <h1
                data-testid="recipe-title"
              >
                {details.strDrink}
              </h1>
              <h6 data-testid="recipe-category">
                {details.strCategory}
              </h6>
              <h6>
                {details.strAlcoholic}
              </h6>
              <img
                src={ details.strDrinkThumb }
                alt={ details.strDrink }
                data-testid="recipe-photo"
              />
              <p data-testid="instructions">
                {details.strInstructions}
              </p>
              <button type="button" data-testid="share-btn">
                Compartilhar
              </button>
              <button type="button" data-testid="favorite-btn">
                Favoritar
              </button>
              <button type="button" data-testid="finish-recipe-btn">
                Finalizar
              </button>
            </div>
          )

      }

    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
