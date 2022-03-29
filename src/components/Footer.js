import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  const history = useHistory();

  return (
    <section className="footer" data-testid="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="Ícone de drinks"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore') }
      >
        <img
          src={ exploreIcon }
          alt="Ícone de explorar"
          data-testid="explore-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img
          src={ mealIcon }
          alt="Ícone de refeição"
          data-testid="food-bottom-btn"
        />
      </button>
    </section>
  );
}
