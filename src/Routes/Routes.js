import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Foods from '../Pages/Foods';
import FoodsDetail from '../Pages/FoodsDetail';
import FoodsInProgress from '../Pages/FoodsInProgress';
import Drinks from '../Pages/Drinks';
import DrinksDetail from '../Pages/DrinksDetail';
import DrinksInProgress from '../Pages/DrinksInProgress';
import Explore from '../Pages/Explore';
import ExploreDrinks from '../Pages/ExploreDrinks';
import ExploreFoods from '../Pages/ExploreFoods';
import ExploreDrinksIngredients from '../Pages/ExploreDrinksIngredients';
import ExploreFoodsIngredients from '../Pages/ExploreFoodsIngredients';
import ExploreFoodsNationalities from '../Pages/ExploreFoodsNationalities';
import Profile from '../Pages/Profile';
import DoneRecipes from '../Pages/DoneRecipes';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import NotFound from '../Pages/NotFound';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />

        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" component={ FoodsDetail } />
        <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />

        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id" component={ DrinksDetail } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />

        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreFoodsIngredients }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNationalities }
        />

        <Route exact path="/profile" component={ Profile } />

        <Route exact path="/done-recipes" component={ DoneRecipes } />

        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />

        <Route exact path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

// Tela de login: /;
// Tela principal de receitas de comidas: /foods;
// Tela principal de receitas de bebidas: /drinks;
// Tela de detalhes de uma receita de comida: /foods/{id-da-receita};
// Tela de detalhes de uma receita de bebida: /drinks/{id-da-receita};
// Tela de receita em progresso de comida: /foods/{id-da-receita}/in-progress;
// Tela de receita em progresso de bebida: /drinks/{id-da-receita}/in-progress;
// Tela de explorar: /explore;
// Tela de explorar comidas: /explore/foods;
// Tela de explorar bebidas: /explore/drinks;
// Tela de explorar comidas por ingrediente: /explore/foods/ingredients;
// Tela de explorar bebidas por ingrediente: /explore/drinks/ingredients;
// Tela de explorar comidas por nacionalidade: /explore/foods/nationalities;
// Tela de perfil: /profile;
// Tela de receitas feitas: /done-recipes;
// Tela de receitas favoritas: /favorite-recipes.
// Tela 404: *

// - Não tem header na tela de login
// - O header tem os ícones corretos na tela de principal de receitas de comidas
// - O header tem os ícones corretos na tela de principal de receitas de bebidas
// - Não tem header na tela de detalhes de uma receita de comida
// - Não tem header na tela de detalhes de uma receita de bebida
// - Não tem header na tela de receita em progresso de comida
// - Não tem header na tela de receita em progresso de bebida
// - O header tem os ícones corretos na tela de explorar
// - O header tem os ícones corretos na tela de explorar comidas
// - O header tem os ícones corretos na tela de explorar bebidas
// - O header tem os ícones corretos na tela de explorar comidas por ingrediente
// - O header tem os ícones corretos na tela de explorar bebidas por ingrediente
// - O header tem os ícones corretos na tela de explorar comidas por nacionalidade
// - O header tem os ícones corretos na tela de perfil
// - O header tem os ícones corretos na tela de receitas feitas
// - O header tem os ícones corretos na tela de receitas favoritas
