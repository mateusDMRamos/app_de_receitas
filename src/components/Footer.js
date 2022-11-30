import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../App.css';

function Footer() {
  return (
    <footer data-testid="footer" id="app-footer">
      <Link
        to="/drinks"
      >
        <button
          type="button"
        >
          <img
            src={ drinkIcon }
            alt="Perfil"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
      <Link
        to="/meals"
      >
        <button
          type="button"
        >
          <img
            src={ mealIcon }
            alt="Perfil"
            data-testid="meals-bottom-btn"
          />
        </button>
      </Link>
    </footer>
  );
}

Footer.propTypes = ({
  title: PropTypes.string,
  searchImage: PropTypes.bool,
}).isRequired;

export default Footer;
