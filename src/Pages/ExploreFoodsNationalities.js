import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreFoodsNationalities() {
  return (
    <div>
      <Header page="Explore Nationalities" handleSearch />
      ExploreFoodsNationalities
      <Footer />
    </div>
  );
}

// https://www.themealdb.com/api/json/v1/1/list.php?a=list
// strArea
// meals
