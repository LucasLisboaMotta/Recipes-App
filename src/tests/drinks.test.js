import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../Pages/Drinks';
import fecthExport from './fectchExport';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tela de drinks', () => {
  beforeEach(fecthExport);
  it('6 botões de classe devem ser renderizados na tela.', async () => {
    renderWithRouter(<Drinks />);
    const button1 = await screen.findByRole('button', { name: 'All' });
    expect(button1).toBeInTheDocument();
    const button2 = await screen.findByRole('button', { name: 'Ordinary Drink' });
    expect(button2).toBeInTheDocument();
    const button3 = await screen.findByRole('button', { name: 'Cocktail' });
    expect(button3).toBeInTheDocument();
    const button4 = await screen.findByRole('button', { name: 'Milk / Float / Shake' });
    expect(button4).toBeInTheDocument();
    const button5 = await screen.findByRole('button', { name: 'Other/Unknown' });
    expect(button5).toBeInTheDocument();
    const button6 = await screen.findByRole('button', { name: 'Cocoa' });
    expect(button6).toBeInTheDocument();
  });

  it('Deve ser criada uma lista de cards', async () => {
    renderWithRouter(<Drinks />);
    await screen.findByRole('button', { name: 'All' });
    const numero = 11;
    for (let i = 0; i <= numero; i += 1) {
      const div = screen.getByTestId(`${i}-recipe-card`);
      expect(div).toBeInTheDocument();
    }
  });

  it('Ao clicar em um botão de categorias, deve ser feito uma nova pesquisa',
    async () => {
      renderWithRouter(<Drinks />);
      const button2 = await screen.findByRole('button', { name: 'Ordinary Drink' });
      userEvent.click(button2);
      const text = await screen.findByText(/3-Mile Long Island Iced Tea/i);
      expect(text).toBeInTheDocument();
      const text2 = await screen.findByText(/410 Gone/i);
      expect(text2).toBeInTheDocument();
      const button3 = await screen.findByRole('button', { name: 'All' });
      userEvent.click(button3);
      const text3 = await screen.findByText(/GG/i);
      expect(text3).toBeInTheDocument();
    });

  it('Os botõs de categoria devem ter a funcionalidade toggle', async () => {
    renderWithRouter(<Drinks />);
    const button2 = await screen.findByRole('button', { name: 'Other/Unknown' });
    userEvent.click(button2);
    const text = await screen.findByText(/A Piece of Ass/i);
    expect(text).toBeInTheDocument();
    const text2 = await screen.findByText(/Absolut Evergreen/i);
    expect(text2).toBeInTheDocument();
    userEvent.click(button2);
    const text3 = await screen.findByText(/GG/i);
    expect(text3).toBeInTheDocument();
    const text4 = screen.queryByText(/A Piece of Ass/i);
    expect(text4).not.toBeInTheDocument();
    const text5 = screen.queryByText(/Absolut Evergreen/i);
    expect(text5).not.toBeInTheDocument();
  });

  it('Verifica se é feito a busca corretamente caso venha de outra pagina', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonLoginSubmit = screen.getByTestId('login-submit-btn');
    fireEvent.change(emailInput, { target: { value: 'xablau@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    userEvent.click(buttonLoginSubmit);
    const exploreButton = await screen.findByTestId('explore-bottom-btn');
    userEvent.click(exploreButton);
    const exploreDrinks = await screen.findByTestId('explore-drinks');
    userEvent.click(exploreDrinks);
    const exploreByIngredient = await screen.findByTestId('explore-by-ingredient');
    userEvent.click(exploreByIngredient);
    const ginIngredient = await screen.findByText(/Light rum/i);
    userEvent.click(ginIngredient);
    const firstDrink = await screen.findByText(/151 Florida Bushwacker/i);
    expect(firstDrink).toBeInTheDocument();
  });
});
