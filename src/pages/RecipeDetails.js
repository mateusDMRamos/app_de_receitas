import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMealsDetails } from '../services/meals';
import { fetchDrinksDetails } from '../services/drinks';

function RecipeDetails({ history, match: { params: { id } } }) {
  const [details, setDetails] = useState('');
  console.log(details);
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
  }, [history.location, id]);
  return (
    <header>
      <h1>Recipe details</h1>
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
