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
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const getInicialRecipes = await fetch(URL);
      const resolveInicialRecipes = await getInicialRecipes.json();
      setState({ foods: resolveInicialRecipes.meals });
    };
    getApi();
  }, [setState]);
  return (
    <div className="foods">
      <Header page="Foods" handleSearch />
      <Cards page="Foods" />
      <Footer />
    </div>
  );
}
