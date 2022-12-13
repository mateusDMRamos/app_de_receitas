import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

export default function RecipesProvider({ children }) {
  const [searchRadio, setSearchRadio] = useState('');
  const [searchText, setSearchText] = useState('');
  const [historyPathname, setHistory] = useState('');
  const [recipes, setRecipes] = useState({ notSearched: true });
  const [redirect, setRedirect] = useState(true);
  const [details, setDetails] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [usedIngredients, setUsedIngredients] = useState([]);

  const value = useMemo(() => ({
    searchRadio,
    setSearchRadio,
    searchText,
    setSearchText,
    historyPathname,
    setHistory,
    recipes,
    setRecipes,
    redirect,
    setRedirect,
    details,
    setDetails,
    usedIngredients,
    setUsedIngredients,
    ingredients,
    setIngredients,
  }), [redirect, recipes, searchRadio, searchText, historyPathname,
    details, ingredients, usedIngredients]);

  return (
    <recipesContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </recipesContext.Provider>
  );
}
RecipesProvider.propTypes = ({
  children: PropTypes.node.isRequired,
});
