import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cocktailDetailsByName } from '../services/theCocktailsAPI';
import { mealDetailsByName } from '../services/theMealsAPI';

function CardRecipe({ index, type }) {
  const [imageURL, setImageURL] = useState('');
  // const [linkURL, setLinkURL] = useState('');

  useEffect(() => {
    const requestDrinkDetails = async () => {
      const details = await cocktailDetailsByName();
      setImageURL(details.strDrinkThumb);
      // setLinkURL(details.idDrink);
    };

    const requestFoodDetails = async () => {
      const details = await mealDetailsByName();
      setImageURL(details.strMealThumb);
      // setLinkURL(details.idMeal);
    };

    if (type === 'drink') {
      requestDrinkDetails();
    } else {
      requestFoodDetails();
    }
  }, []);

  return (
    // <Link to={ type === 'drink' ? `/drinks/${linkURL}` : `/foods/${linkURL}` }>
    <div data-testid={ `${index}-recomendation-card` }>
      <img
        className="image-drink-recommended"
        src={ imageURL }
        alt="Recomendação"
      />
      {/* <p>{ name }</p> */}
    </div>
    // </Link>
  );
}

CardRecipe.propTypes = {
  index: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardRecipe;
