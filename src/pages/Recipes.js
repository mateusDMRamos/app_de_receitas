import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import Footer from '../components/Footer';

function Recipes({ history }) {
  const { setHistory } = useContext(recipesContext);
  useEffect(() => { setHistory(history.location.pathname); });

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
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}).isRequired;

export default Recipes;
