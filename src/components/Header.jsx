import React from 'react';
import { Link } from 'react-router-dom';
// import Search from '../pages/Search';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Músicas Favoritas </Link>
        <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
      </header>
    );
  }
}

export default Header;
