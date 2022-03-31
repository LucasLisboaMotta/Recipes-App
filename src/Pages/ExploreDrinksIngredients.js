import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../context/Context';

export default function ExploreDrinksIngredients() {
  const [ingredientsArray, setIgredientsArry] = useState([]);
  const history = useHistory();
  const { setExploreIngredient } = useContext(context);
  const MAXIMUNS_CARDS = 12;
  useEffect(() => {
    const getIgredients = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const ingredients = await fetch(URL);
      const resolveIngredients = await ingredients.json();
      setIgredientsArry(resolveIngredients.drinks);
    };
    getIgredients();
  }, []);
  const onClickCard = async (ingredient) => {
    await setExploreIngredient(ingredient);
    history.push('/drinks');
  };
  return (
    <div>
      <Header page="Explore Ingredients" handleSearch={ false } />
      {ingredientsArray.filter((_, index) => index < MAXIMUNS_CARDS)
        .map(({ strIngredient1 }, index) => (
          <button
            type="button"
            key={ strIngredient1 }
            onClick={ () => onClickCard(strIngredient1) }

          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                alt={ index }
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              />
              <p data-testid={ `${index}-card-name` }>

                {strIngredient1}
              </p>
            </div>
          </button>
        ))}
      <Footer />
    </div>
  );
}
