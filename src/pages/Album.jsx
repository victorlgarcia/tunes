import React from 'react';
import { Link } from 'react-router-dom';

class album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Link to="/">Home</Link>
        <h2>Conteúdo do Album</h2>
      </div>
    );
  }
}
export default album;
