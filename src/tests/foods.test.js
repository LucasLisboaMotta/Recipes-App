import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fecthExport from './fectchExport';

describe('', () => {
  beforeEach(async () => {
    render(<App />);
    fecthExport();
  });
  it('', async () => {
    const buttonsArray = ['All', 'Beef', 'BreaFast', 'Chicken', 'Desser', 'Goat'];
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonLoginSubmit = screen.getByTestId('login-submit-btn');
    fireEvent.change(emailInput, { target: { value: 'xablau@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    userEvent.click(buttonLoginSubmit);
    const button = screen.getByRole('button', { name: 'All' });
    expect(button).toBeInTheDocument();
    // buttonsArray.forEach((element) => {
    // });
  });
});
