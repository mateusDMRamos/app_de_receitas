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
