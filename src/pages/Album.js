import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <Link to="/">Home</Link>
        <h2>Conteúdo do Album</h2>
      </div>
    );
  }
}
export default album;
