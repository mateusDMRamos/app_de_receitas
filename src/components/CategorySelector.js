import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import '../App.css';

function CategorySelector({ categories }) {
  return (
    <div>
      {
        categories.map((c, i) => (
          <button
            key={ i }
            type="button"
            data-testid={ `${c.strCategory}-category-filter` }
          >
            { c.strCategory }
          </button>
        ))
      }
    </div>
  );
}

CategorySelector.propTypes = ({
  categories: PropTypes.arrayOf(PropTypes.shape({ strCategory: PropTypes.string })),
}).isRequired;

export default CategorySelector;
