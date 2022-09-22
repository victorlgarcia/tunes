import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      description: '',
      email: '',
      nextPage: false,
      isButtonDisabled: true,
    };
  }

  handleCondition = () => {
    const { name, image, description, email } = this.state;

    console.log(name, image, description, email);
    console.log(name.length, image.length, description.length, email.length);
    if (
      name.length > 0
      && image.length > 0
      && description.length > 0
      && email.includes('@')
      && email.includes('.com')
    ) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.handleCondition);
  };

  handleSubmit = () => {
    // event.preventDefault();
    updateUser(this.state);
    this.setState({
      nextPage: true,
    });
  }

  render() {
    const { name, email, description, image, nextPage, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="profEdit">
          <h3 className="title is-3">Editar minhas informações</h3>
          {image.length > 0 ? (
            <div className="divImageEdit">
              <img
                className="imageEdit"
                src={ image }
                alt={ name }
              />
            </div>
          ) : null}
          <div className="profileEditMain">
            <div className="nameEdit">
              <p className="title is-5">Nome</p>
              <input
                name="name"
                className="input"
                value={ name }
                onChange={ this.handleChange }
                type="text"
                placeholder="Insira seu nome completo"
              />
            </div>
            <div className="inputDivEdit">
              <p className="title is-5">Email</p>
              <input
                name="email"
                className="input"
                value={ email }
                type="text"
                onChange={ this.handleChange }
                placeholder="Insira seu nome email"
              />
            </div>
            <div className="imageinput">
              <p className="title is-5">Imagem</p>
              <input
                name="image"
                className="input"
                value={ image }
                type="text"
                onChange={ this.handleChange }
                placeholder="Insira um url de uma imagem"
              />
            </div>
            <div className="textAreaDiv">
              <p className="title is-5">Sobre</p>
              <textarea
                name="description"
                className="textarea is-small"
                value={ description }
                onChange={ this.handleChange }
                type="text"
                placeholder="Escreva um pouco sobre você"
              />
            </div>
            <button
              className="button is-medium is-responsive"
              disabled={ isButtonDisabled }
              onClick={ (event) => this.handleSubmit(event) }
              type="submit"
            >
              Salvar as mudanças

            </button>
          </div>
        </div>
        {nextPage ? <Redirect to="/profile" /> : null}
      </div>
    );
  }
}
export default ProfileEdit;
