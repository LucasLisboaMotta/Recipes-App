import React from 'react';
import { screen, fireEvent, render, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fecthExport from './fectchExport';

const enterFoodsPage = () => {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const buttonLoginSubmit = screen.getByTestId('login-submit-btn');
  fireEvent.change(emailInput, { target: { value: 'xablau@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: '1234567' } });
  userEvent.click(buttonLoginSubmit);
};

describe('Testando tela de foods', () => {
  beforeEach(fecthExport);
  afterEach(cleanup);
  it('Todos os botões de categoria devem aparecer', async () => {
    await act(async () => {
      render(<App />);
    });
    enterFoodsPage();
    const button = await screen.findByRole('button', { name: 'All' });
    expect(button).toBeInTheDocument();
    const button2 = await screen.findByRole('button', { name: 'Beef' });
    expect(button2).toBeInTheDocument();
    const button3 = await screen.findByRole('button', { name: 'Breakfast' });
    expect(button3).toBeInTheDocument();
    const button4 = await screen.findByRole('button', { name: 'Chicken' });
    expect(button4).toBeInTheDocument();
    const button5 = await screen.findByRole('button', { name: 'Dessert' });
    expect(button5).toBeInTheDocument();
    const button6 = await screen.findByRole('button', { name: 'Goat' });
    expect(button6).toBeInTheDocument();
  });

  it('', async () => {
    await act(async () => {
      render(<App />);
    });
    // enterFoodsPage();
    // npm run test-coverage
  });
});
