import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Recipes({ history }) {
  return (
    <header>
      {
        history.location.pathname === '/meals'
          ? <Header title="Meals" searchImage />
          : <Header title="Drinks" searchImage />
      }
    </header>
  );
}

Recipes.propTypes = ({
  history: PropTypes.string,
}).isRequired;

export default Recipes;
