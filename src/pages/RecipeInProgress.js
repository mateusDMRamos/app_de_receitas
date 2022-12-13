import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import { fetchMealsDetails } from '../services/meals';
import { fetchDrinksDetails } from '../services/drinks';
import RecipeList from '../components/RecipeList';

function RecipeInProgress({ history: { location: { pathname }, push },
  match: { params: { id } } }) {
  const { setDetails, ingredients,
    usedIngredients, details } = useContext(recipesContext);
  const [disable, setDisable] = useState(true);

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
    if (ingredients.length === usedIngredients.length) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [ingredients, usedIngredients]);

  const saveRecipeInLocalStorage = (newRecipe) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([newRecipe]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newRecipe]));
    }
  };

  const newMealRecipeDone = () => {
    const today = new Date();
    const newRecipe = {
      id: details.idMeal,
      type: 'meal',
      nationality: details.strArea === null ? '' : details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
      doneDate: today,
      tags: details.strTags === null ? [] : details.strTags.split(','),
    };
    saveRecipeInLocalStorage(newRecipe);
  };

  const newDrinkRecipeDone = () => {
    const today = new Date();
    const newRecipe = {
      id: details.idDrink,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
      doneDate: today,
      tags: details.strTags === null ? [] : details.strTags.split(','),
    };
    saveRecipeInLocalStorage(newRecipe);
  };

  const handleClick = () => {
    if (pathname.includes('meals')) {
      newMealRecipeDone();
    } else {
      newDrinkRecipeDone();
    }
    push('/done-recipes');
  };

  return (
    <div>
      <Header title="Recipe In Progress" searchIcon={ false } />
      <RecipeList
        mealsPathname={ pathname.includes('meals') }
        inProgress
      />
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="btnFinish"
        disabled={ disable }
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
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
    push: PropTypes.func,
  }).isRequired,
};

export default RecipeInProgress;
