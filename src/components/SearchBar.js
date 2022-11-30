import React, { useContext } from 'react';
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
    setSearchRadio, searchRadio, searchText, historyPathname,
  } = useContext(recipesContext);

  const firstLetter = 'first-letter';

  const handleClickMeals = async () => {
    if (searchRadio === 'ingredient') {
      await fetchMealsByIngredients(searchText);
    } else if (searchRadio === 'name') {
      await fetchMealsByName(searchText);
    } else if (searchText.length > 1 && searchRadio === firstLetter) {
      global.alert('Your search must have only 1 (one) character');
    } else if (searchText.length === 1 && searchRadio === firstLetter) {
      await fetchMealsByFirstLetter(searchText);
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleClickDrinks = async () => {
    if (searchRadio === 'ingredient') {
      await fetchDrinksByIngredients(searchText);
    } else if (searchRadio === 'name') {
      await fetchDrinksByName(searchText);
    } else if (searchText.length > 1 && searchRadio === firstLetter) {
      global.alert('Your search must have only 1 (one) character');
    } else if (searchText.length === 1 && searchRadio === firstLetter) {
      await fetchDrinksByFirstLetter(searchText);
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleClick = () => {
    if (historyPathname === '/meals') {
      handleClickMeals();
    } else {
      handleClickDrinks();
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
