import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import Footer from '../components/Footer';

function Recipes({ history }) {
  const { setHistory, recipes } = useContext(recipesContext);
  useEffect(() => { setHistory(history.location.pathname); });
  useEffect(() => {
    if (recipes.drinks) {
      console.log(recipes.drinks);
      if (recipes.drinks.length === 1) {
        history.push(`/drinks/${recipes.drinks[0].idDrink}`);
      }
    } else if (recipes.meals) {
      console.log(recipes.meals);
      if (recipes.meals.length === 1) {
        history.push(`/meals/${recipes.meals[0].idMeal}`);
      }
    } else if (!recipes.notSearched) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes, history]);
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
