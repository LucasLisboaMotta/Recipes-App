export const addMealsToken = () => {
  localStorage.setItem('mealsToken', 1);
};

export const addCocktailsToken = () => {
  localStorage.setItem('cocktailsToken', 1);
};

export const addEmailUser = (email) => {
  const user = { email };
  localStorage.setItem('user', JSON.stringify(user));
};

export const saveDoneRecipes = (recipe) => {
  const prevRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!prevRecipes) localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
  else localStorage.setItem('doneRecipes', JSON.stringify([...prevRecipes, recipe]));
};

export const getDoneRecipes = () => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (recipes) return recipes;
  return [];
};

export const isInProgressRecipe = (id, type) => {
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (recipes) return Object.keys(recipes[type]).some((idRecipe) => idRecipe === id);
  return false;
};

export const saveInProgressRecipe = (typeKey, recipe) => {
  const prevRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!prevRecipes) {
    const NewRecipe = { [typeKey]: { [recipe.id]: [recipe] } };
    console.log(NewRecipe);
    return localStorage.setItem('inProgressRecipes', JSON.stringify(NewRecipe));
  }
  prevRecipes[typeKey][recipe.id] = recipe;
  localStorage.setItem('inProgressRecipes', JSON.stringify(prevRecipes));
};

export const getInProgressRecipe = (id) => {
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (recipes) return Object.entries(recipes[type]).find(([idRecipe]) => idRecipe === id);
  return false;
};

export const setStartRecipes = (recipe) => {
  const prevRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!prevRecipes) localStorage.setItem('inProgressRecipes', JSON.stringify([recipe]));
  else {
    localStorage.setItem('inProgressRecipes', JSON.stringify([...prevRecipes, recipe]));
  }
};

export const saveFavoritesRecipes = (recipe) => {
  const prevRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!prevRecipes) {
    return localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
  }
  const hasSave = prevRecipes
    .some(({ id, type }) => recipe.id === id && recipe.type === type);
  if (hasSave) {
    const filteredFavoriteRecipes = prevRecipes
      .filter(({ id, type }) => !(recipe.id === id && recipe.type === type));
    return localStorage
      .setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([...prevRecipes, recipe]));
};

export const isFavoriteRecipe = (idRecipe, typeRecipe) => {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!recipes) return false;
  return recipes.some(({ id, type }) => idRecipe === id && type === typeRecipe);
};

export const getEmailUser = () => JSON.parse(localStorage.getItem('user'));

export const clearStorage = () => localStorage.clear();

export const inProgressIngredients = (id) => {
  const recipes = JSON.parse(localStorage.getItem('inProgressIngredients'));
  if (recipes) return recipes[id];
  return false;
};

export const setInProgressIngredients = (id, ingredients) => {
  const recipes = JSON.parse(localStorage.getItem('inProgressIngredients'));
  if (recipes) {
    recipes[id] = ingredients;
    return localStorage.setItem('inProgressIngredients', JSON.stringify(recipes));
  }
  const newRecipes = { [id]: ingredients };
  localStorage.setItem('inProgressIngredients', JSON.stringify(newRecipes));
};
