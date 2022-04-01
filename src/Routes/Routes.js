import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Foods from '../Pages/Foods';
import FoodsDetail from '../Pages/FoodsDetail';
import Drinks from '../Pages/Drinks';
import FoodsInProgress from '../Pages/FoodsInProgress';
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
        <Route path="/explore/foods/ingredients" component={ ExploreFoodsIngredients } />
        <Route
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
