import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardDoneRecipe from '../components/CardDoneRecipe';
import { getDoneRecipes } from '../services/localStorage';
import '../styles/doneRecipes.css';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(getDoneRecipes());
  }, []);

  const filterDoneRecipes = (filterType) => {
    const doneRecipes = getDoneRecipes();
    if (filterType === 'all') {
      return setRecipes(doneRecipes);
    }
    setRecipes(doneRecipes.filter((recipe) => recipe.type === filterType));
  };

  const renderRecipes = () => (
    recipes.length > 0 && recipes.map((recipe, index) => (
      <CardDoneRecipe key={ index } recipe={ recipe } index={ index } />
    ))
  );

  return (
    <>
      <Header page="Done Recipes" handleSearch={ false } />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => { filterDoneRecipes('all'); } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => { filterDoneRecipes('food'); } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => { filterDoneRecipes('drink'); } }

        >
          Drinks
        </button>
      </section>
      <section className="recipes-container">
        {renderRecipes()}
      </section>
    </>
  );
}
