import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMealsRecomendation } from '../services/meals';
import { fetchDrinksRecomendation } from '../services/drinks';
import '../style/Recomendation.css';

function Recomendation({ history }) {
  const [recipeRecomendations, setRecipeRecomendations] = useState(
    { drinks: [], meals: [] },
  );

  useEffect(() => {
    const { pathname } = history.location;
    const results = async () => {
      if (pathname.includes('meals')) {
        const responseDrinksRecomendation = await fetchDrinksRecomendation();
        setRecipeRecomendations(responseDrinksRecomendation);
        console.log('vddv');
      } else {
        const responseMealsRecomendation = await fetchMealsRecomendation();
        setRecipeRecomendations(responseMealsRecomendation);
      }
    };
    results();
  }, []);

  const recomendationQuantity = 6;
  return (
    <div className="recomendation">
      {
        history.location.pathname.includes('meals')
          ? (
            recipeRecomendations.drinks
              .filter((recomendation, index) => index < recomendationQuantity)
              .map((recomendation, index) => (
                <div
                  className="recomendation-card"
                  data-testid={ `${index}-recommendation-card` }
                  key={ recomendation.idDrink }
                >
                  <img
                    src={ recomendation.strDrinkThumb }
                    alt={ recomendation.strDrink }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>
                    { recomendation.strDrink }
                  </p>
                </div>
              ))
          )
          : (
            recipeRecomendations.meals
              .filter((recomendation, index) => index < recomendationQuantity)
              .map((recomendation, index) => (
                <div
                  className="recomendation-card"
                  data-testid={ `${index}-recommendation-card` }
                  key={ recomendation.idMeal }
                >
                  <img src={ recomendation.strMealThumb } alt={ recomendation.strMeal } />
                  <p data-testid={ `${index}-recommendation-title` }>
                    { recomendation.strMeal }
                  </p>
                </div>
              ))
          )
      }
    </div>
  );
}

Recomendation.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default Recomendation;
