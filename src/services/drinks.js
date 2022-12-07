export const fetchDrinksByIngredients = async (ingredient) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export const fetchDrinksByName = async (drinkName) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export const fetchDrinksByFirstLetter = async (firstLetterDrink) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetterDrink}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export const fetchDrinksCategory = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export const fetchDrinksByCategory = async (drinksCategory) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinksCategory}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export const fetchDrinksDetails = async (drinkId) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};
