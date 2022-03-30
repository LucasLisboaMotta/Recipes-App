import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../context/Context';
import '../styles/foods.css';
import Cards from '../components/Cards';

export default function Foods() {
  const { setState } = useContext(context);
  useEffect(() => {
    const getApi = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const getInicialRecipes = await fetch(URL);
      const resolveInicialRecipes = await getInicialRecipes.json();
      setState({ foods: resolveInicialRecipes.drinks });
    };
    getApi();
  }, [setState]);
  return (
    <div className="drinks">
      <Header page="Drinks" handleSearch />
      <Cards page="Drinks" />
      <Footer />
    </div>
  );
}
