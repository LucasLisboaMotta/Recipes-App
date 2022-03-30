import React, { useCallback, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/foods.css';

function Foods() {
  const [categories, setCategories] = useState();
  const getCategories = useCallback(async () => {
    const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await result.json();
    setCategories(data.meals);
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
      <Footer />
    </div>
  );
}

export default Foods;
