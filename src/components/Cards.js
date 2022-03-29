import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import context from '../context/Context';

export default function Cards({ page }) {
  const keys = {
    Foods: { name: 'strMeal', img: 'strMealThumb', id: 'idMeal' },
    Drinks: { name: 'strDrink', img: 'strDrinkThumb', id: 'idDrink' },
  };
  const { state: { foods } } = useContext(context);
  return (
    <div>
      { foods.filter((_, index) => {
        const MAXIMUM_ARRAY_LENGTH = 12;
        if (index < MAXIMUM_ARRAY_LENGTH) return true;
        return false;
      }).map((element, index) => (
        <Link key={ index } to={ `/${page.toLowerCase()}/${element[keys[page].id]}` }>
          <div data-testid={ `${index}-recipe-card` }>
            <h2 data-testid={ `${index}-card-name` }>{element[keys[page].name]}</h2>
            <img
              src={ element[keys[page].img] }
              alt={ element[keys[page].name] }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

Cards.propTypes = {
  page: PropTypes.string.isRequired,
};
