import React, { useCallback, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../context/Context';
import '../styles/foods.css';
import Cards from '../components/Cards';

function Drinks() {
  const [categories, setCategories] = useState();
  const { setState } = useContext(context);
  // const onClickButton = async (category) => {
  //   const URL = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=${category}`;
  //   const getDrinksByCategory = await fetch(URL);
  //   const resolveDrinksByCategory = await getDrinksByCategory.json();
  //   setState({ foods: resolveDrinksByCategory.drinks });
  // };
  useEffect(() => {
    const getApi = async () => {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const getInicialRecipes = await fetch(URL);
      const resolveInicialRecipes = await getInicialRecipes.json();
      setState({ foods: resolveInicialRecipes.drinks });
    };
    getApi();
  }, [setState]);
  const getCategories = useCallback(async () => {
    const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await result.json();
    setCategories(data.drinks);
  }, [setCategories]);

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
    <div className="drinks">
      <Header page="Drinks" handleSearch />
      Drinks
      {filteredCategories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      ))}
      <Cards page="Drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
