import React from 'react';
import Header from '../components/Header';
import Carregando from './Carregando';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Carregando /> : <p> Conteúdo da Favorites</p>}
      </div>
    );
  }
}

export default Favorites;
