import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreDrinks() {
  const history = useHistory();
  const onClickSpriseButton = async () => {
    const URL = 'https//www.thecocktaildb.com/api/json/v1/1/random.php';
    const getSurpriseDrink = await fetch(URL);
    const resolveSurpriseDrink = await getSurpriseDrink.json();
    history.push(`/drinks/${resolveSurpriseDrink.drinks[0].idDrink}`);
  };
  return (
    <div>
      <Header page="Explore Drinks" handleSearch={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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
