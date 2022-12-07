import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMealsDetails } from '../services/meals';

function RecipeDetails({ history, match: { params: { id } } }) {
  useEffect(() => {
    const results = fetchMealsDetails(id);
    console.log(results);
  }, [id, results]);
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
};

export default RecipeDetails;
