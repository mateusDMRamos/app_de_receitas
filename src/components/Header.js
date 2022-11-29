import React from 'react';
import PropTypes from 'prop-types';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchImage }) {
  return (
    <header>

      <button
        type="button"
      >
        <img
          src={ profileIcon }
          alt="Perfil"
          data-testid="profile-top-btn"
        />
      </button>

      {
        searchImage
      && (
        <button
          type="button"
        >
          <img
            src={ searchIcon }
            alt="Pesquisar"
            data-testid="search-top-btn"
          />
        </button>
      )
      }

      <h1
        data-testid="page-title"
      >
        {title}
      </h1>

    </header>
  );
}

Header.propTypes = ({
  title: PropTypes.string,
  searchImage: PropTypes.bool,
}).isRequired;

export default Header;
