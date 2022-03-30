import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Carousel } from 'react-responsive-carousel';
import { mealDetailsRequest } from '../services/theMealsAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/recipeDetails.css';
import CardRecipe from '../components/CardRecipe';
import { cocktailDetailsByName } from '../services/theCocktailsAPI';

// REF CARROSSEL https://www.npmjs.com/package/react-responsive-carousel

export default function FoodsDetail({ history, match: { params: { id } } }) {
  const [mealDetails, setMealDetails] = useState('');
  const [idLinkYouTube, setIdLinkYoutube] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    const requestGenericRecomendations = async () => {
      const MAX_RECOMMENDATIONS = 6;
      const recomendationsRequest = await cocktailDetailsByName();
      setRecomendations(recomendationsRequest.slice(0, MAX_RECOMMENDATIONS));
    };

    const requestMeal = async () => {
      const meal = await mealDetailsRequest(id);
      setMealDetails(meal);
      setIsLoaded(true);

      if (meal) {
        setIdLinkYoutube(meal.strYoutube.split('https://www.youtube.com/watch?v=')[1]);
        const tirty = 30;
        const arr = [];
        for (let i = 1; i <= tirty; i += 1) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.length > 0) {
            arr.push(`${ingredient} - ${measure}`);
          }
        }
        setIngredients(arr);
      }
    };
    requestMeal();
    requestGenericRecomendations();
  }, []);

  return (
    isLoaded && (
      <article>
        <section className="header-recipe">
          <img
            data-testid="recipe-photo"
            alt="Imagem da receita"
            src={ mealDetails.strMealThumb }
          />
          <h2 data-testid="recipe-title">
            { mealDetails.strMeal }
          </h2>
          <h3 data-testid="recipe-category">
            { mealDetails.strCategory }
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
            { mealDetails.strInstructions }
          </p>
        </section>
        <section className="video-recipe">
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
        </section>
        <section className="recommended-recipe">
          <h4>Recommended</h4>
          <div className="carrousel">
            { recomendations.map((recipe, index) => (
              <CardRecipe
                key={ index }
                type="drink"
                recipe={ recipe }
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

FoodsDetail.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
