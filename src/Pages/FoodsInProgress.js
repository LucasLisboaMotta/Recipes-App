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
  setInProgressIngredients,
  saveDoneRecipes,
} from '../services/localStorage';

// REF CARROSSEL https://www.npmjs.com/package/react-responsive-carousel

export default function FoodsInProgress({ history, match: { params: { id } } }) {
  const [mealDetails, setMealDetails] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkdArr, setCheckdArr] = useState([]);
  // const [recomendations, setRecomendations] = useState([]);
  console.log('render');

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
        let boolCheckedList = arr.map(() => false);
        if (isInProgressRecipe(id, 'food')) {
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
          saveInProgressRecipe('food', obj);
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

  const onClickButton = () => {
    const obj = {
      id: mealDetails.idMeal,
      type: 'food',
      nationality: mealDetails.strArea,
      category: mealDetails.strCategory,
      alcoholicOrNot: '',
      name: mealDetails.strMeal,
      image: mealDetails.strMealThumb,
    };
    saveDoneRecipes(obj);
    history.push('/done-recipes');
  };

  const renderFinishButton = () => (
    verifyRecipeIsDone() && (
      <button
        type="button"
        className="button-finish-recipe"
        data-testid="finish-recipe-btn"
        onClick={ onClickButton }
        disabled={ !checkdArr.every((element) => element) }
      >
        Finish Recipe
      </button>
    )
  );

  const renderIsFavoriteIcon = () => (
    isFavoriteRecipe(id, 'food') ? blackHeartIcon : whiteHeartIcon
  );

  const [favoriteIcon, setFavoriteIcon] = useState(renderIsFavoriteIcon());

  const handleInput = (index, bool) => {
    const newArry = [...checkdArr];
    newArry[index] = bool;
    setInProgressIngredients(`${id}food`, newArry);
    setCheckdArr(newArry);
  };

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
              navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
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
          {
            ingredients.map((ingredient, index) => (
              <label
                htmlFor={ ingredient + index }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                className={ checkdArr[index] ? 'ingredient-checked'
                  : 'ingredient-unchecked' }

              >
                <input
                  id={ ingredient + index }
                  type="checkbox"
                  checked={ checkdArr[index] }
                  onChange={ () => handleInput(index, !checkdArr[index]) }
                />
                {ingredient}

              </label>
            ))
          }
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
