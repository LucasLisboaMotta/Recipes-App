import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Foods from '../Pages/Foods';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        {/* <Route exact path="/foods/{id-da-receita}" component={ About } />
        <Route exact path="/drinks/{id-da-receita}" component={ About } />
        <Route exact path="/foods/{id-da-receita}/in-progress" component={ About } />
        <Route exact path="/drinks/{id-da-receita}/in-progress" component={ About } />
        <Route exact path="/explore" component={ About } />
        <Route exact path="/explore/foods" component={ About } />
        <Route exact path="/explore/drinks" component={ About } />
        <Route exact path="/explore/foods/ingredients" component={ About } />
        <Route exact path="/explore/drinks/ingredients" component={ About } />
        <Route exact path="/explore/foods/nationalities" component={ About } />
        <Route exact path="/profile" component={ About } />
        <Route exact path="/done-recipes" component={ About } />
        <Route exact path="/favorite-recipes" component={ About } />
        <Route exact path="*" component={ About } /> */}
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
