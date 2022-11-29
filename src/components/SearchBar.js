import React from 'react';

function SearchBar() {
  return (
    <div>
      <form>

        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="myGroupName"
        />
        Ingredient

        <input
          type="radio"
          data-testid="name-search-radio"
          name="myGroupName"
        />
        Name

        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="myGroupName"
        />
        First letter

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
