import React, { useCallback, useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../context/Context';
import '../styles/foods.css';
import Cards from '../components/Cards';

function Foods() {
  const [categories, setCategories] = useState();
  const getCategories = useCallback(async () => {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await result.json();
    setCategories(data.meals);
  }, [setCategories]);

  // const [categoryButton, setCategoryButton] = useState('');
  const { setState } = useContext(context);
  // const onClickButton = async (category) => {
  //   const URL = `https://www.themealdb.com/api/json/v1/1/list.php?c=${category}`;
  //   const getFoodsByCategory = await fetch(URL);
  //   const resolveFoodsByCategory = await getFoodsByCategory.json();
  //   setState({ foods: resolveFoodsByCategory.drinks });
  // };
  useEffect(() => {
    const getApi = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const getInicialRecipes = await fetch(URL);
      const resolveInicialRecipes = await getInicialRecipes.json();
      setState({ foods: resolveInicialRecipes.meals });
    };
    getApi();
  }, [setState]);

  useEffect(() => { getCategories(); }, [getCategories]);
  if (!categories) {
    return <p>Carregando...</p>;
  }

  const filteredCategories = categories.filter((_, index) => {
    const MAXIMUM_ARRAY_LENGTH = 5;
    if (index < MAXIMUM_ARRAY_LENGTH) return true;
    return false;
  });

  return (
    <div className="foods">
      <Header page="Foods" handleSearch />
      Foods
      {filteredCategories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      ))}
      <Cards page="Foods" />
      <Footer />
    </div>
  );
}

export default Foods;
