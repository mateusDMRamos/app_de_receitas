import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import '../App.css';
import recipesContext from '../context/recipesContext';
import { fetchMealsByCategory, fetchMealsByName }
  from '../services/meals';
import { fetchDrinksByCategory, fetchDrinksByName }
  from '../services/drinks';

function CategorySelector({ categories, history }) {
  const [filter, setFilter] = useState('');
  const { setRecipes, setRedirect } = useContext(recipesContext);
  const handleClickAll = async () => {
    setRedirect(false);
    setFilter('');
    if (history === '/meals') {
      setRecipes(await fetchMealsByName(''));
    } else {
      setRecipes(await fetchDrinksByName(''));
    }
  };
  const handleClick = async (category) => {
    setRedirect(false);
    if (category === filter) {
      handleClickAll();
    } else {
      setFilter(category);
      if (history === '/meals') {
        setRecipes(await fetchMealsByCategory(category));
      } else {
        setRecipes(await fetchDrinksByCategory(category));
      }
    }
  };

  return (
    <div>
      {
        categories.map((c, i) => (
          <button
            key={ i }
            type="button"
            data-testid={ `${c.strCategory}-category-filter` }
            onClick={ () => {
              handleClick(c.strCategory);
            } }
          >
            {c.strCategory}
          </button>
        ))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
      >
        All
      </button>
    </div>
  );
}

CategorySelector.propTypes = ({
  categories: PropTypes.arrayOf(PropTypes.shape({ strCategory: PropTypes.string })),
}).isRequired;

export default CategorySelector;
