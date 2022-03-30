import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreFoods() {
  const history = useHistory();
  const onClickSpriseButton = async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const getSurpriseFood = await fetch(URL);
    const resolveSurpriseFood = await getSurpriseFood.json();
    history.push(`/foods/${resolveSurpriseFood.meals[0].idMeal}`);
  };
  return (
    <div>
      <Header page="Explore Foods" handleSearch={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ onClickSpriseButton }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}
