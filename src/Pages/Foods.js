import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/foods.css';

export default function Foods() {
  return (
    <div className="foods">
      <Header page="Foods" handleSearch />
      Foods
      <Footer />
    </div>
  );
}
