import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardRecipe({ recipe, type, index }) {
  return (
    <Link
      to={ type === 'drink' ? `/drinks/${recipe.idDrink}` : `/foods/${recipe.idMeal}` }
    >
      <div data-testid={ `${index}-recomendation-card` }>
        <img
          className="image-drink-recommended"
          src={
            type === 'drink' ? recipe.strDrinkThumb : recipe.strMealThumb
          }
          alt="Recomendação"
        />
        <p data-testid={ `${index}-recomendation-title` }>
          { type === 'drink' ? recipe.strDrink : recipe.strMeal }
        </p>
      </div>
    </Link>
  );
}

CardRecipe.defaultProps = {
  recipe: PropTypes.shape({
    idDrink: '',
    idMeal: '',
    strDrinkThumb: '',
    strMealThumb: '',
    strDrink: '',
    strMeal: '',
  }),
};

CardRecipe.propTypes = {
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipe;
