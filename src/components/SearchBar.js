import React from 'react';

function SearchBar() {
  const getURL = (page, radioInput, textInput) => {
    const urlObject = {
      Foods: {
        ingredient: (ingredient) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
        name: (name) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
        'first-letter': (firstLetter) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`,
      },
      Drinks: {
        ingredient: (ingredient) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
        name: (name) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
        'first-letter': (firstLetter) => `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`,
      },
    };
    return urlObject[page][radioInput](textInput);
  };
  return (
    <form>
      <label htmlFor="search-bar">
        <input
          id="search-bar"
          data-testid="search-input"
        />
      </label>
      <label htmlFor="ingredient-button">
        <input
          id="ingredient-button"
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
        />
        Ingredient
      </label>
      <label htmlFor="name-btn">
        <input
          id="name-btn"
          type="radio"
          data-testid="name-search-radio"
          value="name"
        />
        Name
      </label>
      <label htmlFor="first-letter-btn">
        <input
          if="first-letter-btn"
          type="radio"
          data-testid="first-letter-search-radio"
          value="first-letter"
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
