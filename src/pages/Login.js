import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      namePerson: '',
      btnDisabled: true,
      loading: false,
      redi: false,
    };
  }

  handleCondition = () => {
    const { namePerson } = this.state;
    const size = 3;
    if (namePerson.length >= size) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  handleValue = (event) => {
    this.setState({
      namePerson: event.target.value,
    }, this.handleCondition);
  }

  handleSubmit = async () => {
    const { namePerson } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name: namePerson });

    this.setState({
      redi: true,
    });
  }

  render() {
    const { loading, btnDisabled, redi } = this.state;

    return (
      <div className="loginBack" data-testid="page-login">
        <div className="titleLogin">
          <h1 className="title is-2">TrybeTunes</h1>
        </div>
        <div className="loginNameInput">
          <p className="title is-4">Insira seu nome:</p>
        </div>
        <div className="login">
          <input
            className="input"
            data-testid="login-name-input"
            onChange={ this.handleValue }
          />
        </div>
        <div className="loginbutton">
          <button
            className="button is-medium is-responsive"
            type="button"
            data-testid="login-submit-button"
            disabled={ btnDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar

          </button>
        </div>
        <div>
          { loading ? <Carregando />
            : null}
          { redi ? <Redirect to="/search" />
            : null}
          {' '}
        </div>

      </div>
    );
  }
}

export default Login;
