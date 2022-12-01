export const fetchMealsByIngredients = async (ingredient) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export const fetchMealsByName = async (mealName) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export const fetchMealsByFirstLetter = async (firstLetterMeal) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetterMeal}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export const fetchMealsCategory = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};
