import React from 'react';
import { Link } from 'react-router-dom';

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
