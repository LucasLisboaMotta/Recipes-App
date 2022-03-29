import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import context from '../context/Context';
import Cards from './Cards';

function SearchBar({ page }) {
  const [getBarText, setBarText] = useState();
  const [getBtns, setBtns] = useState();
  const [renderCards, setRenderCards] = useState(false);
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

  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setRenderCards(false);
    if (getBarText.length > 1 && getBtns === 'first-letter') {
      return global.alert('Your search must have only 1 (one) character');
    }
    const result = await fetch(getURL(page, getBtns, getBarText));
    const data = await result.json();
    const foods = Object.values(data)[0];
    setState({ foods });
    if (foods === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (foods.length === 1) {
      const keys = { Foods: 'idMeal', Drinks: 'idDrink' };
      history.push(`/${page.toLowerCase()}/${foods[0][keys[page]]}`);
    } else {
      setRenderCards(true);
    }
  };
  return (
    <>
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
            id="first-letter-btn"
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
      {renderCards && <Cards page={ page } />}
    </>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchBar;
