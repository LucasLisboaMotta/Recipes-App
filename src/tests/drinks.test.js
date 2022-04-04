import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import fecthExport from './fectchExport';
import renderWithRouter from './renderWithRouter';

describe('', () => {
  beforeEach(fecthExport);
  it('', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    console.log(history.location);
    const button1 = await screen.findByRole('button', { name: 'Cocktail' });
    // expect(button1).toBeInTheDocument();
  });
});
