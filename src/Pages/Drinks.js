import React, { useCallback, useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import context from '../context/Context';
import '../styles/foods.css';
import Cards from '../components/Cards';

function Drinks() {
  const [categories, setCategories] = useState();
  const { setState, exploreIngredient, setExploreIngredient } = useContext(context);
  const [categoryButton, setCategoryButton] = useState('');
  const onClickButton = async (category) => {
    let URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    if (category === categoryButton || category === 'All') {
      URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      setCategoryButton('');
    } else {
      setCategoryButton(category);
    }
    const getDrinksByCategory = await fetch(URL);
    const resolveDrinksByCategory = await getDrinksByCategory.json();
    setState({ foods: resolveDrinksByCategory.drinks });
  };
  useEffect(() => {
    const getApi = async () => {
      let URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      if (exploreIngredient !== '') {
        URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${exploreIngredient}`;
        setExploreIngredient('');
      }
      const getInicialRecipes = await fetch(URL);
      const resolveInicialRecipes = await getInicialRecipes.json();
      setState({ foods: resolveInicialRecipes.drinks });
    };
    getApi();
  }, []);
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
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => onClickButton('All') }
      >
        All
      </button>
      {filteredCategories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => onClickButton(strCategory) }
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
