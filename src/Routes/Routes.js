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
        {/* lucas */}
        <Route exact path="/foods" component={ Foods } />
        {/* // matheus */}
        <Route exact path="/foods/:id" component={ FoodsDetail } />
        {/* // alvaro */}
        <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
        {/* //asafe */}
        <Route exact path="/drinks" component={ Drinks } />
        {/* //lucas */}
        <Route exact path="/drinks/:id" component={ DrinksDetail } />
        {/* //matheus */}
        <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
        {/* //alvaro */}
        <Route exact path="/explore" component={ Explore } />
        {/* // asafe */}
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        {/* // lucas */}
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        {/* // matheus */}
        <Route path="/explore/foods/ingredients" component={ ExploreFoodsIngredients } />
        {/* // alvaro */}
        <Route
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
        {/* //asafe */}
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNationalities }
        />
        {/* // lucas */}
        <Route exact path="/profile" component={ Profile } />
        {/* //matheus */}
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        {/* //alvaro */}
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        {/* // asafe */}
        <Route exact path="*" component={ NotFound } />
        {/* // lucas */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
