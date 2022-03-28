import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addMealsToken, addCocktailsToken, addEmailUser } from '../services/localStorage';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const verifyEmail = () => {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return validEmail.test(email);
    };

    const verifyPassword = () => {
      const MIN_LENGTH_PASSWD = 7;
      return password.length >= MIN_LENGTH_PASSWD;
    };

    const handleButtonDisable = () => {
      if (verifyEmail() && verifyPassword()) {
        setIsButtonDisabled(false);
        return;
      }
      setIsButtonDisabled(true);
    };

    handleButtonDisable();
  }, [email, password]);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleLogin = () => {
    addMealsToken();
    addCocktailsToken();
    addEmailUser(email);
    history.push('/foods');
  };

  return (
    <section>
      <form>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ handleEmail }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ handlePassword }
        />
        <button
          type="button"
          onClick={ handleLogin }
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
      </form>
    </section>

  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
