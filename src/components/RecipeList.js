import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../style/RecipeInProgress.css';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import recipesContext from '../context/recipesContext';

function RecipeList({ mealsPathname, inProgress }) {
  const { details, ingredients, usedIngredients,
    setIngredients, setUsedIngredients } = useContext(recipesContext);
  const [measures, setMeasures] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const keys = Object.keys(details);
    const ingredientKeys = keys.filter((key) => key.includes('strIngredient'));
    const ingredientNames = ingredientKeys
      .filter((ingredient) => details[ingredient] !== '' && details[ingredient] !== null);
    setIngredients(ingredientNames);
    const measureKeys = keys.filter((key) => key.includes('strMeasure'));
    setMeasures(measureKeys);
  }, [details, setIngredients]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) === null) {
      const newRecipesKey = {
        drinks: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesKey));
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (mealsPathname) {
      const mealsInProgress = Object.keys(inProgressRecipes.meals);
      const verifyProgress = mealsInProgress.some((meal) => meal === details.idMeal);
      if (verifyProgress) {
        setUsedIngredients(inProgressRecipes.meals[details.idMeal]);
      } else {
        const newRecipeInProgress = {
          drinks: { ...inProgressRecipes.drinks },
          meals: {
            ...inProgressRecipes.meals,
            [details.idMeal]: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipeInProgress));
      }
    } else {
      const drinksInProgress = Object.keys(inProgressRecipes.drinks);
      const verifyProgress = drinksInProgress.some((drink) => drink === details.idDrink);
      if (verifyProgress) {
        setUsedIngredients(inProgressRecipes.drinks[details.idDrink]);
      } else {
        const newRecipeInProgress = {
          drinks: {
            ...inProgressRecipes.drinks,
            [details.idDrink]: [],
          },
          meals: {
            ...inProgressRecipes.meals,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipeInProgress));
      }
    }
  }, [details.idDrink, details.idMeal, mealsPathname, setUsedIngredients]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (mealsPathname) {
      const attRecipe = {
        drinks: { ...inProgressRecipes.drinks },
        meals: {
          ...inProgressRecipes.meals,
          [details.idMeal]: usedIngredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(attRecipe));
    } else {
      const attRecipe = {
        drinks: {
          ...inProgressRecipes.drinks,
          [details.idDrink]: usedIngredients,
        },
        meals: {
          ...inProgressRecipes.meals,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(attRecipe));
    }
  }, [details.idDrink, details.idMeal, mealsPathname, usedIngredients]);

  const handleCheck = ({ target }) => {
    if (target.checked) {
      target.parentElement.classList = 'checkedLine';
      setUsedIngredients([...usedIngredients, target.name]);
    } else {
      target.parentElement.classList = '';
      const newCheckedIngredients = usedIngredients
        .filter((ingredient) => ingredient !== target.name);
      setUsedIngredients(newCheckedIngredients);
    }
  };

  const handleCopy = (url) => {
    const urlDivisions = 5;
    const urlDivs = url.split('/', urlDivisions);
    const newUrl = (
      `${urlDivs[0]}/${urlDivs[1]}/${urlDivs[2]}/${urlDivs[3]}/${urlDivs[4]}`
    );
    setLinkCopied(true);
    copy(newUrl);
  };

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
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => { handleCopy(window.location.href); } }
              >
                <img src={ shareIcon } alt="share button" />
              </button>
              <button type="button" data-testid="favorite-btn">
                Favoritar
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
                {`${details.strCategory} - ${details.strAlcoholic}`}
              </h6>
              <img
                src={ details.strDrinkThumb }
                alt={ details.strDrink }
                data-testid="recipe-photo"
              />
              <p data-testid="instructions">
                {details.strInstructions}
              </p>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => { handleCopy(window.location.href); } }
              >
                <img src={ shareIcon } alt="share button" />
              </button>
              <button type="button" data-testid="favorite-btn">
                Favoritar
              </button>
            </div>
          )
      }
      { linkCopied ? <p>Link copied!</p> : ''}
      {inProgress ? ingredients.map((ingredient, index) => {
        const verifyCheck = usedIngredients
          .some((usedIngredient) => (
            usedIngredient === `${details[ingredient]} - ${details[measures[index]]}`
          ));
        if (verifyCheck) {
          return (
            <label
              key={ index }
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-step` }
              className="checkedLine"
            >
              <input
                onClick={ handleCheck }
                type="checkbox"
                id={ ingredient }
                name={ `${details[ingredient]} - ${details[measures[index]]}` }
                checked
              />
              {`${details[ingredient]} - ${details[measures[index]]}`}
            </label>
          );
        }
        return (
          <label
            key={ index }
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              onClick={ handleCheck }
              type="checkbox"
              id={ ingredient }
              name={ `${details[ingredient]} - ${details[measures[index]]}` }
            />
            {`${details[ingredient]} - ${details[measures[index]]}`}
          </label>
        );
      }) : ingredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${details[ingredient]} - ${details[measures[index]]}`}
        </li>
      ))}
    </div>
  );
}

RecipeList.propTypes = {
  mealsPathname: PropTypes.bool,
}.isRequired;

export default RecipeList;
