import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header({ page, handleSearch }) {
  const [hasSearchClick, setSearchClick] = useState(false);

  const SearchButton = (
    <button
      type="button"
      onClick={ () => setSearchClick(!hasSearchClick) }
    >
      <img src={ SearchIcon } alt="search icon" data-testid="search-top-btn" />
    </button>
  );

  return (
    <header>
      <Link to="/profile">
        <img src={ ProfileIcon } alt="profile icon" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{page}</h1>
      {hasSearchClick && <input data-testid="search-input" />}
      {handleSearch && SearchButton }
    </header>
  );
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
  handleSearch: PropTypes.bool.isRequired,
};
