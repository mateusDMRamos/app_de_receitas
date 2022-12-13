import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchMealsDetails, fetchMealsRecomendation } from '../services/meals';
import { fetchDrinksDetails, fetchDrinksRecomendation } from '../services/drinks';
import recipesContext from '../context/recipesContext';
import '../style/RecipeDetails.css';
import RecipeList from '../components/RecipeList';

function RecipeDetails({ history, match: { params: { id } } }) {
  const { setDetails } = useContext(recipesContext);
  const [recipeStatus, setRecipeStatus] = useState('notStarted');
  const [recipeRecomendations, setRecipeRecomendations] = useState({});
  useEffect(() => {
    const { pathname } = history.location;
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
  }, [history.location, id, setDetails, setRecipeStatus]);

  useEffect(() => {
    const verifyDoneRecipes = () => {
      if (localStorage.getItem('doneRecipes')) {
        const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
        if (doneRecipes.some((recipe) => recipe.id === id)) {
          setRecipeStatus('finalized');
        }
      }
    };
    const verifyInProgress = () => {
      if (localStorage.getItem('inProgressRecipes')) {
        const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
        if (inProgressRecipes.meals && inProgressRecipes.meals[id]) {
          setRecipeStatus('inProgress');
        }
        if (inProgressRecipes.drinks && inProgressRecipes.drinks[id]) {
          setRecipeStatus('inProgress');
        }
      }
    };
    verifyDoneRecipes();
    verifyInProgress();
  }, [setRecipeStatus, id]);

  useEffect(() => {
    const { pathname } = history.location;
    const results = async () => {
      if (pathname.includes('meals')) {
        const responseDrinksRecomendation = await fetchDrinksRecomendation();
        setRecipeRecomendations(responseDrinksRecomendation);
      } else {
        const responseMealsRecomendation = await fetchMealsRecomendation();
        setRecipeRecomendations(responseMealsRecomendation);
      }
    };
    console.log(recipeRecomendations);
    results();
  }, [history.location, recipeRecomendations]);

  return (
    <header>
      <h1>Recipe details</h1>
      <RecipeList
        mealsPathname={ history.location.pathname.includes('meals') }
        inProgress={ false }
      />
      {recipeStatus === 'finalized'
        ? ''
        : (
          <Link to={ `${history.location.pathname}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="btnPageDetails"
            >
              Start Recipe
            </button>
          </Link>
        ) }
      {recipeStatus === 'inProgress'
        ? (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="btnPageDetails"
          >
            Continue Recipe
          </button>
        )
        : ''}
    </header>
  );
}

RecipeDetails.propTypes = {
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

export default RecipeDetails;
