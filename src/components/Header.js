import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import recipesContext from '../context/recipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, searchImage }) {
  const [search, setSearch] = useState(false);
  const { setSearchText } = useContext(recipesContext);

  return (
    <div>
      <header>
        <Link
          to="/profile"
        >
          <button
            type="button"
          >
            <img
              src={ profileIcon }
              alt="Perfil"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>

        {
          searchImage
      && (
        <button
          type="button"
          onClick={ () => setSearch(!search) } // No img dá erro de lint
        >
          <img
            src={ searchIcon }
            alt="Pesquisar"
            data-testid="search-top-btn"
          />
        </button>
      )
        }

        {
          search
        && (
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search"
            onChange={ ({ target }) => { setSearchText(target.value); } }
          />
        )
        }

        <h1
          data-testid="page-title"
        >
          {title}
        </h1>

        <SearchBar />
      </header>
    </div>
  );
}

Header.propTypes = ({
  title: PropTypes.string,
  searchImage: PropTypes.bool,
}).isRequired;

export default Header;
