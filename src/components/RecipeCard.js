import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import '../App.css';

function RecipeCard({ recipeName, thumb, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ thumb } alt={ recipeName } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{ recipeName }</p>
    </div>
  );
}

RecipeCard.propTypes = ({
  title: PropTypes.string,
  searchImage: PropTypes.bool,
}).isRequired;

export default RecipeCard;
