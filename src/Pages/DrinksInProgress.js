import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cocktailDetailsByID } from '../services/theCocktailsAPI';
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

export default function DrinksDetail({ history, match: { params: { id } } }) {
  const [drinkDetails, setDrinkDetails] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [checkdArr, setCheckdArr] = useState([]);

  useEffect(() => {
    const requestDrink = async () => {
      const drink = await cocktailDetailsByID(id);
      setDrinkDetails(drink);
      setIsLoaded(true);

      if (drink.idDrink) {
        const quantity = Object.keys(drink).length;
        const arr = [];
        for (let i = 1; i <= quantity; i += 1) {
          const ingredient = drink[`strIngredient${i}`];
          const measure = drink[`strMeasure${i}`];
          if (ingredient && ingredient.length > 0) {
            arr.push(`${ingredient} - ${measure}`);
          }
        }
        let boolCheckedList = arr.map(() => false);
        if (isInProgressRecipe(id, 'cocktails')) {
          boolCheckedList = (inProgressIngredients(`${id}drink`));
          // console.log(boolCheckedList);
        } else {
          console.log(drink);
          const obj = {
            id: drink.idDrink,
            type: 'drink',
            nationality: '',
            category: drink.strCategory,
            alcoholicOrNot: drink.strAlcoholic,
            name: drink.strDrink,
            image: drink.strDrinkThumb,
          };
          saveInProgressRecipe('cocktails', obj);
          setInProgressIngredients(`${id}drink`, boolCheckedList);
        }
        setIngredients(arr);
        setCheckdArr(boolCheckedList);
      }
    };
    requestDrink();
  }, []);

  const verifyRecipeIsDone = () => (
    !getDoneRecipes().some((doneRecipe) => doneRecipe.id === id)
  );

  const onClickButton = () => {
    const tags = drinkDetails.strTags ? drinkDetails.strTags.split(',') : [];
    const now = new Date();
    const obj = {
      id: drinkDetails.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkDetails.strCategory,
      alcoholicOrNot: drinkDetails.strAlcoholic,
      name: drinkDetails.strDrink,
      image: drinkDetails.strDrinkThumb,
      tags,
      doneDate: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
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
    isFavoriteRecipe(id, 'drink') ? blackHeartIcon : whiteHeartIcon
  );

  const [favoriteIcon, setFavoriteIcon] = useState(renderIsFavoriteIcon());

  const handleInput = (index, bool) => {
    const newArry = [...checkdArr];
    newArry[index] = bool;
    setInProgressIngredients(`${id}drink`, newArry);
    setCheckdArr(newArry);
  };

  const handleClickFavorite = () => {
    const obj = {
      id: drinkDetails.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkDetails.strCategory,
      alcoholicOrNot: drinkDetails.strAlcoholic,
      name: drinkDetails.strDrink,
      image: drinkDetails.strDrinkThumb,
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
            src={ drinkDetails.strDrinkThumb }
          />
          <h2 data-testid="recipe-title">
            { drinkDetails.strDrink }
          </h2>
          <h3 data-testid="recipe-category">
            { `${drinkDetails.strCategory} - ${drinkDetails.strAlcoholic}` }
          </h3>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
              document.querySelector('.alert-link-copied').innerText = 'Link copied!';
            } }
          >
            <img
              src={ shareIcon }
              alt="Ícone compartilhar"
              data-testid="drinks-bottom-btn"
            />
          </button>
          <button type="button" onClick={ handleClickFavorite }>
            <img
              src={ favoriteIcon }
              alt="Ícone favoritar"
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
                  <li
                    className={ checkdArr[index] ? 'ingredient-checked'
                      : 'ingredient-unchecked' }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      id={ ingredient + index }
                      type="checkbox"
                      defaultChecked={ checkdArr[index] }
                      onClick={ () => handleInput(index, !checkdArr[index]) }
                    />
                    {ingredient}
                  </li>
                </label>
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
        <section className="finish-recipe-btn">
          { renderFinishButton() }
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
