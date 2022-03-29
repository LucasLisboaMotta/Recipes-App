import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/drinks.css';

export default function Drinks() {
  return (
    <div className="drinks">
      <Header page="Drinks" handleSearch />
      Drinks
      <Footer />
    </div>
  );
}
