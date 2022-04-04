import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getFavoriteRecipes } from '../services/localStorage';
import CardFavoriteRecipe from '../components/CardFavoriteRecipe';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [reloadRecipes, setReloadRecipes] = useState(false);

  useEffect(() => {
    setRecipes(getFavoriteRecipes());
    setReloadRecipes(false);
  }, [reloadRecipes]);

  const renderRecipes = () => (
    recipes.length > 0 && recipes.map((recipe, index) => (
      <CardFavoriteRecipe
        reload={ setReloadRecipes }
        key={ index }
        recipe={ recipe }
        index={ index }
      />
    ))
  );

  const filterDoneRecipes = (filterType) => {
    const favoriteRecipes = getFavoriteRecipes();
    if (filterType === 'all') {
      return setRecipes(favoriteRecipes);
    }
    setRecipes(favoriteRecipes.filter((recipe) => recipe.type === filterType));
  };

  return (
    <div>
      <Header page="Favorite Recipes" handleSearch={ false } />
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
      <section>
        { renderRecipes() }
      </section>
    </div>
  );
}

export default FavoriteRecipes;
