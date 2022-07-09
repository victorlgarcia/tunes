import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Artista from './Artista';
import Carregando from './Carregando';
// import Album from './Album';

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
    const { input } = this.state;
    this.setState({
      artist: input,
    });

    this.setState({

      load: true,

    });
    const x = await searchAlbumsAPI(input);

    this.setState({
      apiObj: x,
      input: '',
    }, this.handleCondition);
    this.setState({

      load: false,

    });
  }

  handleValueAlbum = (albumId) => {
    console.log(albumId);
    const { passarValorParaoPai } = this.props;
    passarValorParaoPai(albumId);
  }

  render() {
    const { btnDisabled, load, apiObj, input, artist } = this.state;

    return (
      <div data-testid="page-search">

        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            onChange={ this.handleValue }
            value={ input }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisabled }
            onClick={ this.handleSubmit }
          >
            Pesquisar

          </button>
        </form>

        {artist.length > 0
          ? <Artista input={ artist } />

          : null}

        {load ? <Carregando /> : null}

        {apiObj.length === 0 ? <p>Nenhum álbum foi encontrado</p> : null}

        <ul>

          {apiObj.map((album) => (

            <li key={ album.collectionId }>

              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
                state={ { albumId: album.collectionId } }
              >
                <img
                  src={ album.artworkUrl100 }
                  alt={ album.collectionName }
                />
                <p>{album.collectionName}</p>

              </Link>

            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Search.propTypes = {
  passarValorParaoPai: propTypes.func,
}.isRequired;
export default Search;
