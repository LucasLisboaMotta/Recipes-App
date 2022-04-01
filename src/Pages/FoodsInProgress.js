import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mealDetailsRequest } from '../services/theMealsAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/recipeDetails.css';
import {
  getDoneRecipes,
  isInProgressRecipe,
  isFavoriteRecipe,
  saveFavoritesRecipes,
  saveInProgressRecipe,
  inProgressIngredients,
  setInProgressIngredients } from '../services/localStorage';

// REF CARROSSEL https://www.npmjs.com/package/react-responsive-carousel

export default function FoodsInProgress({ history, match: { params: { id } } }) {
  const [mealDetails, setMealDetails] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkdArr, setCheckdArr] = useState([]);
  // const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    const requestMeal = async () => {
      const meal = await mealDetailsRequest(id);
      setMealDetails(meal);
      setIsLoaded(true);

      if (meal) {
        const tirty = 30;
        const arr = [];
        for (let i = 1; i <= tirty; i += 1) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.length > 0) {
            arr.push(`${ingredient} - ${measure}`);
          }
        }
        let boolCheckedList = arr.map(() => true);
        if (isInProgressRecipe(id, 'meals')) {
          boolCheckedList = (inProgressIngredients(`${id}food`));
        } else {
          const obj = {
            id: meal.idMeal,
            type: 'food',
            nationality: meal.strArea,
            category: meal.strCategory,
            alcoholicOrNot: '',
            name: meal.strMeal,
            image: meal.strMealThumb,
          };
          saveInProgressRecipe(obj);
          setInProgressIngredients(`${id}food`, boolCheckedList);
        }
        setIngredients(arr);
        setCheckdArr(boolCheckedList);
      }
    };
    requestMeal();
  }, []);

  const verifyRecipeIsDone = () => (
    !getDoneRecipes().some((doneRecipe) => doneRecipe.id === id)
  );

  const renderFinishButton = () => (
    verifyRecipeIsDone() && (
      <button
        type="button"
        className="button-finish-recipe"
        data-testid="finish-recipe-btn"
        onClick={ () => { history.push(`/foods/${id}/in-progress`); } }
      >
        { isInProgressRecipe(id, 'meals') ? 'Continue Recipe' : 'Finish Recipe' }
      </button>
    )
  );

  const renderIsFavoriteIcon = () => (
    isFavoriteRecipe(id, 'food') ? blackHeartIcon : whiteHeartIcon
  );

  const [favoriteIcon, setFavoriteIcon] = useState(renderIsFavoriteIcon());

  const handleClickFavorite = () => {
    const obj = {
      id: mealDetails.idMeal,
      type: 'food',
      nationality: mealDetails.strArea,
      category: mealDetails.strCategory,
      alcoholicOrNot: '',
      name: mealDetails.strMeal,
      image: mealDetails.strMealThumb,
    };
    saveFavoritesRecipes(obj);
    setFavoriteIcon(renderIsFavoriteIcon());
  };

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
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              navigator.clipboard.writeText(window.location.href);
              document.querySelector('.alert-link-copied').innerText = 'Link copied!';
            } }
          >
            <img
              src={ shareIcon }
              alt="Ícone favotitar"
            />
          </button>
          <button type="button" onClick={ handleClickFavorite }>
            <img
              src={ favoriteIcon }
              alt="Ícone compartilhar"
              data-testid="favorite-btn"
            />
          </button>
          <p className="alert-link-copied" />
        </section>
        <section className="ingredients-recipe">
          <h4>Ingredients</h4>
          <ul>
            {
              ingredients.map((ingredient, index) => (
                <label htmlFor={ ingredient + index } key={ index }>
                  <input id={ ingredient + index } type="checkbox" />
                  <li
                    data-testid={ `${index}-ingredient-step` }
                  >
                    {ingredient}
                  </li>

                </label>
                // 'ingredient-checked'
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
        <section className="finish-recipe-btn">
          { renderFinishButton() }
        </section>
      </article>
    )
  );
}

FoodsInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
