import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipe({ recipe, index }) {
  const {
    image,
    name,
    nationality,
    category,
    doneDate,
    type,
    id,
    tags,
    alcoholicOrNot } = recipe;

  return (
    <article>
      <Link to={ `/${type}s/${id}` }>
        <img
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
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
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
      <p className="alert-link-copied" />
      {tags.map((tag, indexTag) => (
        <p
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ `${tag}-${indexTag}` }
        >
          { tag }
        </p>
      ))}
    </article>
  );
}

CardDoneRecipe.propTypes = {
  recipe: PropTypes.shape({
    category: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardDoneRecipe;
