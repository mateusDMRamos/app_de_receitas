import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';

import {
  fetchMealsByIngredients, fetchMealsByName, fetchMealsByFirstLetter,
} from '../services/meals';
import {
  fetchDrinksByIngredients, fetchDrinksByName, fetchDrinksByFirstLetter,
} from '../services/drinks';

function SearchBar() {
  const {
    setSearchRadio, searchRadio, searchText, historyPathname, setRecipes,
    recipes, setRedirect,
  } = useContext(recipesContext);

  useEffect(() => {
    if (searchClicked) {
      setRedirect(true);
    }
  }, [recipes, setRedirect]);

  const firstLetter = 'first-letter';

  const handleClickMeals = async () => {
    try {
      if (searchRadio === 'ingredient') {
        setRecipes(await fetchMealsByIngredients(searchText));
      } else if (searchRadio === 'name') {
        setRecipes(await fetchMealsByName(searchText));
      } else if (searchText.length > 1 && searchRadio === firstLetter) {
        global.alert('Your search must have only 1 (one) character');
      } else if (searchText.length === 1 && searchRadio === firstLetter) {
        setRecipes(await fetchMealsByFirstLetter(searchText));
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleClickDrinks = async () => {
    try {
      if (searchRadio === 'ingredient') {
        setRecipes(await fetchDrinksByIngredients(searchText));
      } else if (searchRadio === 'name') {
        setRecipes(await fetchDrinksByName(searchText));
      } else if (searchText.length > 1 && searchRadio === firstLetter) {
        global.alert('Your search must have only 1 (one) character');
      } else if (searchText.length === 1 && searchRadio === firstLetter) {
        setRecipes(await fetchDrinksByFirstLetter(searchText));
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleClick = async () => {
    if (historyPathname === '/meals') {
      await handleClickMeals();
    } else {
      await handleClickDrinks();
    }
  };

  return (
    <div>
      <form>

        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="searchType"
            id="ingredient"
            onClick={ () => { setSearchRadio('ingredient'); } }
          />
          Ingredient
        </label>

        <label htmlFor="name-search">
          <input
            type="radio"
            data-testid="name-search-radio"
            name="searchType"
            id="name-search"
            onClick={ () => { setSearchRadio('name'); } }
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="searchType"
            id="first-letter"
            onClick={ () => { setSearchRadio('first-letter'); } }
          />
          First letter
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>

      </form>
    </div>
  );
}

SearchBar.propTypes = ({
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}).isRequired;

export default SearchBar;
