import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Carregando from './Carregando';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
      load: false,
      nextPage: false,
    };
  }

  async componentDidMount() {
    this.setState({
      load: true,
    });

    const userReturn = await getUser();
    this.setState({
      userName: userReturn.name,
      userEmail: userReturn.email,
      userImage: userReturn.image,
      userDescription: userReturn.description,
      load: false,
    });
  }

  handleClick = () => {
    this.setState({
      nextPage: true,
    });
  }

  render() {
    const { userName, userEmail, userImage, userDescription, load,
      nextPage } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />

        {load ? (<Carregando />) : (
          <div className="profileMain">
            <div className="profileImage">
              {userImage.length > 0
                ? (
                  <div>
                    <img
                      className="imageProfileDoc"
                      src={ userImage }
                      alt={ `Imagem de ${userName}` }
                    />
                  </div>) : null }
              <div className="profileInfo">
                <div>
                  <p className="subtitle is-4">Nome:</p>
                  {userName.length > 0
                    ? (
                      <h2
                        className="subtitle is-3"
                        name="nome"
                      >
                        {userName}

                      </h2>)
                    : <p>_________________________</p>}

                </div>
                <div className="emailProfile">
                  <p className="subtitle is-4">Email:</p>
                  {userEmail.length > 0 ? <p className="subtitle is-3">{userEmail}</p>
                    : <p>_________________________</p>}

                </div>
                <div className="descriptionProfile">
                  <p className="subtitle is-4">Sobre:</p>
                  {userDescription.length > 0 ? (
                    <p className="subtitle is-6">{userDescription}</p>)
                    : <p>_________________________</p>}
                </div>
                <div className="buttonProfile">
                  <button
                    className="button is-medium is-responsive"
                    type="button"
                    onClick={ this.handleClick }
                  >
                    Editar Perfil

                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {nextPage ? <Redirect to="/profile/edit" /> : null}
      </div>
    );
  }
}

export default Profile;
