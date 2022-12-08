import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import { fetchMealsDetails } from '../services/meals';
import { fetchDrinksDetails } from '../services/drinks';

function RecipeInProgress({ history: { location: { pathname } },
  match: { params: { id } } }) {
  const { details, setDetails } = useContext(recipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const results = async () => {
      if (pathname.includes('meals')) {
        const responseMealsDetails = await fetchMealsDetails(id);
        setDetails(responseMealsDetails.meals[0]);
      } else {
        const responseDrinksDetails = await fetchDrinksDetails(id);
        setDetails(responseDrinksDetails.drinks[0]);
      }
    };
    results();
  }, [pathname, id, setDetails]);

  useEffect(() => {
    const keys = Object.keys(details);
    const ingredientKeys = keys.filter((key) => key.includes('strIngredient'));
    const ingredientNames = ingredientKeys
      .filter((ingredient) => details[ingredient] !== '' && details[ingredient] !== null);
    setIngredients(ingredientNames);
    const measureKeys = keys.filter((key) => key.includes('strMeasure'));
    setMeasures(measureKeys);
  }, [details]);

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
      {ingredients.map((ingredient, index) => (
        <label
          key={ index }
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          <input type="checkbox" id={ ingredient } />
          {`${details[ingredient]} - ${details[measures[index]]}`}
        </label>
      ))}
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
