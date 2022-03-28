import React from 'react';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header>
      <img src={ ProfileIcon } alt="profile icon" data-testid="profile-top-btn" />
      <h1 data-testid="page-title">Pagina atual(colocar dinamico depois)</h1>
      <img src={ SearchIcon } alt="search icon" data-testid="search-top-btn" />
    </header>
  );
}

// - Não tem header na tela de login
// - O header tem os ícones corretos na tela de principal de receitas de comidas
// - O header tem os ícones corretos na tela de principal de receitas de bebidas
// - Não tem header na tela de detalhes de uma receita de comida
// - Não tem header na tela de detalhes de uma receita de bebida
// - Não tem header na tela de receita em progresso de comida
// - Não tem header na tela de receita em progresso de bebida
// - O header tem os ícones corretos na tela de explorar
// - O header tem os ícones corretos na tela de explorar comidas
// - O header tem os ícones corretos na tela de explorar bebidas
// - O header tem os ícones corretos na tela de explorar comidas por ingrediente
// - O header tem os ícones corretos na tela de explorar bebidas por ingrediente
// - O header tem os ícones corretos na tela de explorar comidas por nacionalidade
// - O header tem os ícones corretos na tela de perfil
// - O header tem os ícones corretos na tela de receitas feitas
// - O header tem os ícones corretos na tela de receitas favoritas
