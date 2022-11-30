import React, { useContext } from 'react';
import recipesContext from '../context/recipesContext';
import {
  fetchMealsByIngredients, fetchMealsByName, fetchMealsByFirstLetter,
} from '../services/meals';

function SearchBar() {
  const { setSearchRadio, searchRadio, searchText } = useContext(recipesContext);

  const firstLetter = 'first-letter';

  const handleClick = async () => {
    if (searchRadio === 'ingredient') {
      await fetchMealsByIngredients(searchText);
    } else if (searchRadio === 'name') {
      await fetchMealsByName(searchText);
    } else if (searchText.length > 1 && searchRadio === firstLetter) {
      global.alert('Your search must have only 1 (one) character');
    } else if (searchText.length === 1 && searchRadio === firstLetter) {
      await fetchMealsByFirstLetter(searchText);
    } else {
      global.alert('Select a filter');
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

export default SearchBar;
