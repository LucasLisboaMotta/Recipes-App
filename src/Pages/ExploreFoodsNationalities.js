import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import context from '../context/Context';

export default function ExploreFoodsNationalities() {
  const [nationalitiesArray, getNationalitiesArray] = useState([]);
  const { setState } = useContext(context);
  useEffect(() => {
    const getApi = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const getNationalitiesFetch = await fetch(URL);
      const resolveNationalitiesFetch = await getNationalitiesFetch.json();
      getNationalitiesArray(resolveNationalitiesFetch.meals);
    };
    getApi();
  }, []);
  useEffect(() => {
    const getApi = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const getInicialRecipes = await fetch(URL);
      const resolveInicialRecipes = await getInicialRecipes.json();
      setState({ foods: resolveInicialRecipes.meals });
    };
    getApi();
  }, [setState]);
  const selectChange = async ({ target: { value } }) => {
    let URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
    if (value === 'All') URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const getInicialRecipes = await fetch(URL);
    const resolveInicialRecipes = await getInicialRecipes.json();
    setState({ foods: resolveInicialRecipes.meals });
  };
  return (
    <div>
      <Header page="Explore Nationalities" handleSearch />
      <select data-testid="explore-by-nationality-dropdown" onChange={ selectChange }>
        <option value="All" data-testid="All-option">All</option>
        {nationalitiesArray.map(({ strArea }) => (
          <option
            value={ strArea }
            key={ strArea }
            data-testid={ `${strArea}-option` }
          >
            {strArea}
          </option>
        ))}
      </select>
      <Cards page="Foods" />
      <Footer />
    </div>
  );
}
