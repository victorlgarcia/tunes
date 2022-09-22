import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Artista from './Artista';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      artist: '',
      btnDisabled: true,
      load: false,
      apiObj: [],
    };
  }

  handleValue = (event) => {
    this.setState({
      input: event.target.value,
    }, this.handleCondition);
  }

  handleCondition = () => {
    const { input } = this.state;
    const size = 2;
    if (input.length >= size) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Foi');
    const { input } = this.state;
    this.setState({
      artist: input,
    });

    this.setState({

      load: true,

    });
    const albumApi = await searchAlbumsAPI(input);

    this.setState({
      apiObj: albumApi,
      input: '',
    }, this.handleCondition);
    this.setState({

      load: false,

    });
  }

  render() {
    const { btnDisabled, load, apiObj, input, artist } = this.state;

    return (
      <div data-testid="page-search">

        <Header />
        <form className="searchForm">
          <div className="inputSeachAlbum">
            <input
              className="input is-medium"
              data-testid="search-artist-input"
              onChange={ this.handleValue }
              value={ input }
            />
          </div>
          <button
            className="button is-medium is-responsive"
            value={ artist }
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisabled }
            onClick={ (event) => this.handleSubmit(event) }
          >
            Pesquisar

          </button>
        </form>
        <div className="artistText">
          {artist.length > 0 && !load && apiObj.length !== 0
            ? <Artista input={ artist } />

            : <p className="subtitle is-4">Nenhum álbum foi encontrado</p>}

          {load ? <Carregando /> : null}

        </div>

        <div className="albumBackground">
          <ul className="ulSearch">

            {apiObj.map((album) => (

              <li className="album" key={ album.collectionId }>

                <Link
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                  state={ { albumId: album.collectionId } }
                >
                  <img
                    src={ album.artworkUrl100 }
                    alt={ album.collectionName }
                  />

                  <p className="subtitle is-5">{album.collectionName}</p>

                </Link>

              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  passarValorParaoPai: propTypes.func,
}.isRequired;
export default Search;
