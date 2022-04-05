import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../Pages/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Tela 404', () => {
  it('Texto "Not Found" deve estar na tela', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
