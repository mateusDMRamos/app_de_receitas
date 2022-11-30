import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes({ history }) {
  return (
    <>
      <header>
        {
          history.location.pathname === '/meals'
            ? <Header title="Meals" searchImage />
            : <Header title="Drinks" searchImage />
        }
      </header>
      <Footer />
    </>
  );
}

Recipes.propTypes = ({
  history: PropTypes.string,
}).isRequired;

export default Recipes;
