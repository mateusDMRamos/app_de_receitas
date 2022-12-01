import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';

function Recipes({ history }) {
  const { setHistory, recipes, setRecipes } = useContext(recipesContext);
  const [firstRecipes, setFirstRecipes] = useState([]);

  useEffect(() => { setHistory(history.location.pathname); });
  useEffect(() => {
    if (recipes.drinks) {
      if (recipes.drinks.length === 1) {
        history.push(`/drinks/${recipes.drinks[0].idDrink}`);
        setRecipes({ notSearched: true });
      }
      const arraySize = 11;
      const firstRecipesFound = recipes.drinks.filter((
        (recipe, index) => index <= arraySize
      ));
      setFirstRecipes(firstRecipesFound);
    } else if (recipes.meals) {
      if (recipes.meals.length === 1) {
        history.push(`/meals/${recipes.meals[0].idMeal}`);
        setRecipes({ notSearched: true });
      }
      const arraySize = 11;
      const firstRecipesFound = recipes.meals.filter((
        (recipe, index) => index <= arraySize
      ));
      setFirstRecipes(firstRecipesFound);
    } else if (!recipes.notSearched) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipes, history, setRecipes]);

  return (
    <>
      <header>
        {
          history.location.pathname === '/meals'
            ? <Header title="Meals" searchImage />
            : <Header title="Drinks" searchImage />
        }
      </header>
      {firstRecipes.map((recipe, index) => {
        if (recipe.idDrink) {
          return (
            <RecipeCard
              index={ index }
              data-testid={ `${index}-recipe-card` }
              key={ recipe.idDrink }
              recipeId={ recipe.idDrink }
              recipeName={ recipe.strDrink }
              thumb={ recipe.strDrinkThumb }
            />
          );
        }
        return (
          <RecipeCard
            index={ index }
            key={ recipe.idMeal }
            recipeId={ recipe.idMeal }
            recipeName={ recipe.strMeal }
            thumb={ recipe.strMealThumb }
          />
        );
      })}
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
