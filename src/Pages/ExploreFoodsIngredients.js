import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../context/Context';

export default function ExploreFoodsIngredients() {
  const [ingredientsArray, setIgredientsArry] = useState([]);
  const history = useHistory();
  const { setExploreIngredient } = useContext(context);
  const MAXIMUNS_CARDS = 12;
  useEffect(() => {
    const getIgredients = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const ingredients = await fetch(URL);
      const resolveIngredients = await ingredients.json();
      setIgredientsArry(resolveIngredients.meals);
    };
    getIgredients();
  }, []);
  const onClickCard = async (ingredient) => {
    await setExploreIngredient(ingredient.split(' ').join('_'));
    history.push('/foods');
  };
  return (
    <div>
      <Header page="Explore Ingredients" handleSearch={ false } />
      {ingredientsArray.filter((_, index) => index < MAXIMUNS_CARDS)
        .map(({ strIngredient }, index) => (
          <button
            type="button"
            key={ strIngredient }
            onClick={ () => onClickCard(strIngredient) }

          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                alt={ index }
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              />
              <p data-testid={ `${index}-card-name` }>

                {strIngredient}
              </p>
            </div>
          </button>
        ))}
      <Footer />
    </div>
  );
}
