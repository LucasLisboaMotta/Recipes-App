import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fecthExport from './fectchExport';
import renderWithRouter from './renderWithRouter';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const SUBMIT_INPUT = 'login-submit-btn';

describe('login', () => {
  beforeEach(fecthExport);

  it('Procura imputs de Email e Senha', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    expect(emailInput && passwordInput).toBeInTheDocument();
  });
  it('Botão de Submit esta desabilitado caso os imputs estejam vazios', () => {
    renderWithRouter(<App />);
    const buttonLoginSubmit = screen.getByTestId(SUBMIT_INPUT);
    expect(buttonLoginSubmit.disabled).toBe(true);
  });
  it('O botão de submit deve continuar desabilitado caso coloquem email e senha invalido',
    () => {
      renderWithRouter(<App />);
      const incorrectEmail = ['xablau', 'xablau.com', 'xablau@gmai.com'];
      const incorrectPassword = ['123', '1234567', 'ar'];
      const emailInput = screen.getByTestId(EMAIL_INPUT);
      const passwordInput = screen.getByTestId(PASSWORD_INPUT);
      const buttonLoginSubmit = screen.getByTestId(SUBMIT_INPUT);
      incorrectEmail.forEach((_, index) => {
        fireEvent.change(emailInput, { target: { value: incorrectEmail[index] } });
        fireEvent.change(passwordInput, { target: { value: incorrectPassword[index] } });
        expect(buttonLoginSubmit.disabled).toBe(true);
      });
    });
  it('O botão deve ser habilitado para e-mail e senha validos, '
  + 'e em seguida serem desabilitados por e-mail e senhas invalidos',
  () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const buttonLoginSubmit = screen.getByTestId(SUBMIT_INPUT);
    fireEvent.change(emailInput, { target: { value: 'xablau@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(buttonLoginSubmit.disabled).toBe(false);
    fireEvent.change(emailInput, { target: { value: 'xablau' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    expect(buttonLoginSubmit.disabled).toBe(true);
    fireEvent.change(emailInput, { target: { value: 'thururu@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(buttonLoginSubmit.disabled).toBe(false);
  });
  it('Apos clicar no botão submit, redirecionar para a pagina foods', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const buttonLoginSubmit = screen.getByTestId(SUBMIT_INPUT);
    fireEvent.change(emailInput, { target: { value: 'xablau@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    userEvent.click(buttonLoginSubmit);
    const title = await screen.findByRole('heading', { name: 'Foods' });
    expect(title).toBeInTheDocument();
  });
});
