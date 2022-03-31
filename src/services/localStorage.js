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

export const getEmailUser = () => JSON.parse(localStorage.getItem('user'));

export const clearStorage = () => localStorage.clear();
