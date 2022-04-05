import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreFoods from '../Pages/ExploreFoods';
import fecthExport from './fectchExport';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tela Explore Foods', () => {
  beforeEach(fecthExport);

  const getExploreButton = async () => {
    const exploreButton = await screen.findByTestId('explore-bottom-btn');
    userEvent.click(exploreButton);
    const exploreDrinks = await screen.findByTestId('explore-foods');
    userEvent.click(exploreDrinks);
  };
  it('Titulo e botões devem aparecer na tela', () => {
    renderWithRouter(<ExploreFoods />);
    const title = screen.getByText(/Explore Foods/i);
    const byIngredientButton = screen.getByTestId('explore-by-ingredient');
    const byNationalityButton = screen.getByTestId('explore-by-nationality');
    const surpriseButton = screen.getByTestId('explore-surprise');
    expect(title).toBeInTheDocument();
    expect(byIngredientButton).toBeInTheDocument();
    expect(byNationalityButton).toBeInTheDocument();
    expect(surpriseButton).toBeInTheDocument();
  });

  it('Verificando botão explore by ingredient', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonLoginSubmit = screen.getByTestId('login-submit-btn');
    fireEvent.change(emailInput, { target: { value: 'xablau@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    userEvent.click(buttonLoginSubmit);
    await getExploreButton();
    const exploreByIngredient = await screen.findByTestId('explore-by-ingredient');
    userEvent.click(exploreByIngredient);
    const title = await screen.findByText(/Explore Ingredients/i);
    expect(title).toBeInTheDocument();
  });
  it('Verificando botão explore by nationality', async () => {
    renderWithRouter(<App />);
    await getExploreButton();
    const exploreByIngredient = await screen.findByTestId('explore-by-nationality');
    userEvent.click(exploreByIngredient);
    const title = await screen.findByText(/Explore Nationalities/i);
    expect(title).toBeInTheDocument();
  });
  it('Verificando botão explore surprise', async () => {
    renderWithRouter(<App />);
    await getExploreButton();
    const exploreByIngredient = await screen.findByTestId('explore-surprise');
    userEvent.click(exploreByIngredient);
    const title = await screen.findByText(/Spicy Arrabiata Penne/i);
    expect(title).toBeInTheDocument();
  });
});
