import React from 'react';

function SearchBar() {
  return (
    <div>
      <form>

        <label htmlFor="ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="searchType"
            id="ingredient"
          />
          Ingredient
        </label>

        <label htmlFor="name-search">
          <input
            type="radio"
            data-testid="name-search-radio"
            name="searchType"
            id="name-search"
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="searchType"
            id="first-letter"
          />
          First letter
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Search
        </button>

      </form>
    </div>
  );
}

export default SearchBar;
