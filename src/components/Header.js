import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      recoveryName: '',
      ret: false,
    };
  }

  componentDidMount() {
    this.handleThings();
  }

  handleThings = async () => {
    const teste = await getUser();
    this.setState({
      recoveryName: teste.name,
      ret: true,
    });
  }

  render() {
    const { ret, recoveryName } = this.state;

    return (
      <div className="header">
        <div className="headerTitle">
          <h4 className="title is-3"> TrybeTunes </h4>
        </div>
        <div className="headerName">
          {!ret ? null : <p className="title is-6">Bem Vindo(a)!</p> }
          <p data-testid="header-user-name" className="title is-3">{recoveryName}</p>
        </div>
        {!ret ? <Carregando />
          : null}
        <header data-testid="header-component">
          <nav className="nav">
            <div className="searchNav">
              <Link
                className="subtitle is-5"
                data-testid="link-to-search"
                to="/search"
              >
                {' '}
                Search
                {' '}
              </Link>
            </div>
            <div className="searchNav">
              <Link
                className="subtitle is-5"
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Músicas Favoritas

              </Link>
            </div>
            <div className="searchNav">
              <Link
                className="subtitle is-5"
                data-testid="link-to-profile"
                to="/profile"
              >
                {' '}
                Perfil
                {' '}

              </Link>
            </div>
          </nav>
        </header>

      </div>
    );
  }
}

export default Header;
