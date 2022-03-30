import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [state, setState] = useState({ foods: [] });
  const [exploreIngredient, setExploreIngredient] = useState('');

  return (
    <Context.Provider
      value={ {
        state, setState, exploreIngredient, setExploreIngredient } }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
