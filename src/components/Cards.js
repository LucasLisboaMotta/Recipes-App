import React from 'react';
import PropTypes from 'prop-types';

export default function Cards({ page, api }) {
  const keys = {
    Foods: { name: 'strMeal', img: 'strMealThumb' },
    Drinks: { name: 'strDrink', img: 'strDrinkThumb' },
  };
  return (
    <div>
      { api.map((element, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <h2 data-testid={ `${index}-card-name` }>{element[keys[page].name]}</h2>
          <img
            src={ element[keys[page].img] }
            alt={ element[keys[page].name] }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </div>
  );
}

Cards.propTypes = {
  page: PropTypes.string.isRequired,
  api: PropTypes.arrayOf(PropTypes.object).isRequired,
};
