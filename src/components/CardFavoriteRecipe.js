import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { saveFavoritesRecipes } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFavoriteRecipe({ recipe, index, reload }) {
  const {
    image,
    name,
    nationality,
    category,
    type,
    id,
    alcoholicOrNot } = recipe;

  const handleClickFavorite = () => {
    saveFavoritesRecipes(recipe);
    reload(true);
  };

  return (
    <article>
      <Link to={ `/${type}s/${id}` }>
        <img
          style={ { width: '200px' } }
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { `${nationality} - ${category} - ${alcoholicOrNot}` }
      </p>
      <button
        type="button"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
          document.querySelector('.alert-link-copied').innerText = 'Link copied!';
        } }
      >
        <img
          src={ shareIcon }
          alt="Ícone favotitar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <button type="button" onClick={ handleClickFavorite }>
        <img
          src={ blackHeartIcon }
          alt="Ícone favoritar"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
      <p className="alert-link-copied" />
    </article>
  );
}

CardFavoriteRecipe.propTypes = {
  recipe: PropTypes.shape({
    category: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  reload: PropTypes.func.isRequired,
};

export default CardFavoriteRecipe;
