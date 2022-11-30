import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

export default function RecipesProvider({ children }) {
  const [searchRadio, setSearchRadio] = useState('');
  const [searchText, setSearchText] = useState('');

  const value = useMemo(() => ({
    searchRadio,
    setSearchRadio,
    searchText,
    setSearchText,
  }), [searchRadio, searchText]);

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
