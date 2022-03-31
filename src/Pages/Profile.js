import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEmailUser, clearStorage } from '../services/localStorage';

export default function Profile() {
  const history = useHistory();
  const user = getEmailUser();
  return (
    <div>
      <Header page="Profile" handleSearch={ false } />
      <h2 data-testid="profile-email">
        {user ? user.email : 'User'}
      </h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          clearStorage();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
