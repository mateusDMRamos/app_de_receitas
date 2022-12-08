import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';

function RecipeList({ mealsPathname, inProgress }) {
  const { details } = useContext(recipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

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
      {
        mealsPathname
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
              <iframe
                title="Recipe Video"
                className="embed-responsive-item"
                src={ details.strYoutube }
                data-testid="video"
                allowFullScreen
              />
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
                { `${details.strCategory} - ${details.strAlcoholic}` }
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
      {inProgress ? ingredients.map((ingredient, index) => (
        <label
          key={ index }
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          <input type="checkbox" id={ ingredient } />
          {`${details[ingredient]} - ${details[measures[index]]}`}
        </label>
      )) : ingredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${details[ingredient]} - ${details[measures[index]]}`}
        </li>
      )) }
    </div>
  );
}

RecipeList.propTypes = {
  mealsPathname: PropTypes.bool,
}.isRequired;

export default RecipeList;
