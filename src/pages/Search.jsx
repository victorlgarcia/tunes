import React from 'react';
import { Link } from 'react-router-dom';
// import Header from './components/Header.jsx';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Link to="/"> Home </Link>

        <p>Conteúdo da Search</p>
      </div>
    );
  }
}
export default Search;
