import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import context from '../context/Context';

function SearchBar({ page }) {
  const [getBarText, setBarText] = useState();
  const [getBtns, setBtns] = useState();
  const { setState } = useContext(context);
  const buttonsObj = {
    igredientBtn: true,
    nameBtn: false,
    firstLetterBtn: false,
  };
  const [isEnableButton, enableButton] = useState(buttonsObj);

  const getURL = (pages, radioInput, textInput) => {
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
    return urlObject[pages][radioInput](textInput);
  };

  const handleSearchBar = (event) => {
    setBarText(event.target.value);
  };

  const handleRadioButtons = (event) => {
    setBtns(event.target.name);

    const btnsObj = {
      ingredient: false,
      name: false,
      'first-letter': false,
    };

    enableButton({ ...btnsObj, [event.target.name]: true });
  };

  const issueAlert = () => {
    if (getBarText.length > 1 && getBtns === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    issueAlert();
    const result = await fetch(getURL(page, getBtns, getBarText));
    const data = await result.json();
    setState({ foods: Object.values(data) });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="search-bar">
        <input
          id="search-bar"
          data-testid="search-input"
          name="searchBar"
          onChange={ handleSearchBar }
        />
      </label>
      <label htmlFor="ingredient-button">
        <input
          id="ingredient-button"
          type="radio"
          data-testid="ingredient-search-radio"
          name="ingredient"
          checked={ isEnableButton.ingredient }
          onChange={ handleRadioButtons }
        />
        Ingredient
      </label>
      <label htmlFor="name-btn">
        <input
          id="name-btn"
          type="radio"
          data-testid="name-search-radio"
          name="name"
          checked={ isEnableButton.name }
          onChange={ handleRadioButtons }
        />
        Name
      </label>
      <label htmlFor="first-letter-btn">
        <input
          if="first-letter-btn"
          type="radio"
          data-testid="first-letter-search-radio"
          name="first-letter"
          checked={ isEnableButton['first-letter'] }
          onChange={ handleRadioButtons }
        />
        First Letter
      </label>
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchBar;
