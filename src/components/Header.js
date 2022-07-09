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
      <>
        <h4> Menu </h4>
        <header data-testid="header-component">
          <nav>
            <Link data-testid="link-to-search" to="/search"> Search </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Músicas Favoritas

            </Link>
            <Link
              data-testid="link-to-profile-edit"
              to="/profile/edit"
            >

              Perfil Edit

            </Link>
            <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
          </nav>
          <p data-testid="header-user-name">{recoveryName}</p>
        </header>

        {!ret ? <Carregando />
          : null}
      </>
    );
  }
}

export default Header;
