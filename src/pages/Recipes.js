import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import recipesContext from '../context/recipesContext';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { fetchMealsByName, fetchMealsCategory } from '../services/meals';
import { fetchDrinksByName, fetchDrinksCategory } from '../services/drinks';
import CategorySelector from '../components/CategorySelector';

function Recipes({ history }) {
  const { setHistory, recipes, setRecipes, redirect } = useContext(recipesContext);
  const [firstRecipes, setFirstRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchRecipes = async (fetchFunction) => {
      const initialRecipes = await fetchFunction('');
      setRecipes(initialRecipes);
    };

    const fetchCategories = async (fetchFunction, key) => {
      const mealsCategories = await fetchFunction();
      const categoriesSize = 4;
      const filteredCategories = mealsCategories[key]
        .filter((c, i) => i <= categoriesSize);
      setCategories(filteredCategories);
    };

    if (history.location.pathname === '/meals') {
      fetchRecipes(fetchMealsByName);
      fetchCategories(fetchMealsCategory, 'meals');
    } else {
      fetchRecipes(fetchDrinksByName);
      fetchCategories(fetchDrinksCategory, 'drinks');
    }
  }, [setRecipes, history.location.pathname]);

  useEffect(() => { setHistory(history.location.pathname); });

  useEffect(() => {
    if (recipes.drinks) {
      if (recipes.drinks.length === 1 && redirect) {
        history.push(`/drinks/${recipes.drinks[0].idDrink}`);
        setRecipes({ notSearched: true });
      }
      const arraySize = 11;
      const firstRecipesFound = recipes.drinks.filter((
        (recipe, index) => index <= arraySize
      ));
      setFirstRecipes(firstRecipesFound);
    } else if (recipes.meals) {
      if (recipes.meals.length === 1 && redirect) {
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
  }, [redirect, recipes, setRecipes, history]);

  return (
    <>
      <header>
        {
          history.location.pathname === '/meals'
            ? <Header title="Meals" searchImage />
            : <Header title="Drinks" searchImage />
        }
      </header>
      <CategorySelector categories={ categories } history={ history.location.pathname } />
      {firstRecipes.map((recipe, index) => {
        if (recipe.idDrink) {
          return (
            <RecipeCard
              index={ index }
              type="drinks"
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
            type="meals"
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
