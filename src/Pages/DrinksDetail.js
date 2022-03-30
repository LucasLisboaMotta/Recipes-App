import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cocktailDetailsByID } from '../services/theCocktailsAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/recipeDetails.css';
import CardRecipe from '../components/CardRecipe';

// REF CARROSSEL https://www.npmjs.com/package/react-responsive-carousel

export default function DrinksDetail({ history, match: { params: { id } } }) {
  const [drinkDetails, setDrinkDetails] = useState('');
  // const [idLinkYouTube, setIdLinkYoutube] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // const [drinkId, setDrinkId] = useState('');

  const recommended = ['0', '1', '2', '3', '4', '5'];

  useEffect(() => {
    const requestDrink = async () => {
      const drink = await cocktailDetailsByID(id);
      setDrinkDetails(drink);
      setIsLoaded(true);

      if (drink.idDrink) {
        // setIdLinkYoutube(drink.strVideo.split('https://www.youtube.com/watch?v=')[1]);
        const quantity = Object.keys(drink).length;
        const arr = [];
        for (let i = 1; i <= quantity; i += 1) {
          const ingredient = drink[`strIngredient${i}`];
          const measure = drink[`strMeasure${i}`];
          if (ingredient && ingredient.length > 0) {
            arr.push(`${ingredient} - ${measure}`);
          }
        }
        setIngredients(arr);
      }
    };
    console.log('tela de drink');
    requestDrink();
  }, []);

  return (
    isLoaded && (
      <article>
        <section className="header-recipe">
          <img
            data-testid="recipe-photo"
            alt="Imagem da receita"
            src={ drinkDetails.strDrinkThumb }
          />
          <h2 data-testid="recipe-title">
            { drinkDetails.strDrink }
          </h2>
          <h4 data-testid="recipe-alcoholic">
            { drinkDetails.strAlcoholic }
          </h4>
          <h3 data-testid="recipe-category">
            { drinkDetails.strCategory }
          </h3>
          <button type="button" data-testid="share-btn">
            <img
              src={ shareIcon }
              alt="Ícone favotitar"
              // data-testid="drinks-bottom-btn"
            />
          </button>
          <button type="button" data-testid="favorite-btn">
            <img
              src={ whiteHeartIcon }
              alt="Ícone compartilhar"
            // data-testid="drinks-bottom-btn"
            />
          </button>
        </section>
        <section className="ingredients-recipe">
          <h4>Ingredients</h4>
          <ul>
            {
              ingredients.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))
            }
          </ul>
        </section>
        <section className="instructions-recipe">
          <h4>Instructions</h4>
          <p data-testid="instructions">
            { drinkDetails.strInstructions }
          </p>
        </section>
        {/* <section className="video-recipe">
          <h4>Video</h4>
          <iframe
            data-testid="video"
            width="300"
            height="200"
            src={ `https://www.youtube.com/embed/${idLinkYouTube}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </section> */}
        <section className="recommended-recipe">
          <h4>Recommended</h4>
          <div className="carrousel">
            { recommended.map((index) => (
              <CardRecipe
                key={ index }
                type="food"
                index={ index }
              />
            ))}
          </div>
        </section>
        <section className="start-recipe-btn">
          <button
            type="button"
            className="button-start-recipe"
            data-testid="start-recipe-btn"
            onClick={ () => { history.push(`/foods/${id}/in-progress`); } }
          >
            Start Recipe
          </button>
        </section>
      </article>
    )
  );
}

DrinksDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
