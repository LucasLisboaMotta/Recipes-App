import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import ExploreFoodsNationalities from '../Pages/ExploreFoodsNationalities';
import fecthExport from './fectchExport';
import renderWithRouter from './renderWithRouter';

describe('Testando tela de "ExploreFoodsNationalities', () => {
  beforeEach(fecthExport);
  it('O titulo deve sempre aparecer na tela', () => {
    renderWithRouter(<ExploreFoodsNationalities />);
    const title = screen.getByText('Explore Nationalities');
    expect(title).toBeInTheDocument();
  });
  it('12 cards devem ser renderizados na tela', async () => {
    renderWithRouter(<ExploreFoodsNationalities />);
    const firstElement = await screen.findByTestId('0-recipe-card');
    expect(firstElement).toBeInTheDocument();
    const cards = 12;
    for (let i = 1; i < cards; i += 1) {
      const div = screen.getByTestId(`${i}-recipe-card`);
      expect(div).toBeInTheDocument();
    }
  });
  it('Verificando filtro por nacionalidade', async () => {
    renderWithRouter(<ExploreFoodsNationalities />);
    const select = await screen.findByTestId('explore-by-nationality-dropdown');
    fireEvent.change(select, { target: { value: 'Japanese' } });
    const firstElement = await screen.findByText(/Chicken Karaage/i);
    expect(firstElement).toBeInTheDocument();
  });
  it('Ao voltar o filtro pro All, deve aparecer os cards padrão', async () => {
    renderWithRouter(<ExploreFoodsNationalities />);
    const select = await screen.findByTestId('explore-by-nationality-dropdown');
    fireEvent.change(select, { target: { value: 'Italian' } });
    const firstElement = await screen.findByText(/Budino Di Ricotta/i);
    expect(firstElement).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'All' } });
    const secondElement = await screen.findByText(/Corba/i);
    expect(secondElement).toBeInTheDocument();
  });
});
