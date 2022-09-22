import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: [],
    };
  }

  async componentDidMount() {
    const favoriteMusics = JSON.parse(localStorage.getItem('favorite_songs'));

    this.setState({
      favorite: favoriteMusics,
    });

    const x = await getFavoriteSongs();

    console.log(x);
  }

  handleChange = async ({ target }) => {
    console.log(target.value);
    const { favorite } = this.state;
    this.setState({
      [target.checked]: target.checked,
    });
    const removeFilter = favorite
      .find((a) => a.trackId === (+target.value));
    console.log(removeFilter);
    await removeSong(removeFilter);

    const newLocalStorage = JSON.parse(localStorage.getItem('favorite_songs'));

    this.setState({
      favorite: newLocalStorage,
    });
  };

  render() {
    const { loading, checked, favorite } = this.state;
    // this.setState((prevState) => ({
    //   id: prevState.id + 1,
    // }));
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favoriteBackground">
          <div className="titleFav">
            <h1 className="title is-3">Minhas músicas favoritas!</h1>
          </div>
          { loading ? <Carregando /> : (

            <ul>
              {favorite
                .map((audios) => (
                  <li className="musicaFavList" key={ audios.trackId }>
                    <div className="divImage">
                      <img
                        className="imageFavList"
                        src={ audios.artworkUrl100 }
                        alt={ audios.artistName }
                      />
                    </div>
                    <div className="audioTrackFav">
                      <h2 className="title is-6">{audios.collectionName}</h2>
                      <h2 className="title is-">{audios.trackName }</h2>
                      <audio
                        data-testid="audio-component"
                        src={ audios.previewUrl }
                        controls
                      >
                        <track kind="captions" />
                        O seu navegador não suporta o elemento

                        <code>audio</code>
                      </audio>
                      <div className="checkboxFav">
                        <label className="title is-6" htmlFor="inputTrack">
                          Retirar dos favoritos
                          <input
                            className="favMusic"
                            value={ audios.trackId }
                            name="inputTrack"
                            type="checkbox"
                            checked={ checked }
                            data-testid={ `checkbox-music-${audios.trackId}` }
                            onChange={ this.handleChange }
                          />
                        </label>
                      </div>
                    </div>
                  </li>
                ))}
              {favorite.length === 0 ? (
                <div
                  className="emptyFavList"
                >
                  <h2 className="title is-4">Sua lista está vazia</h2>

                </div>) : null}
            </ul>

          )}
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  favoriteSong: propTypes.string,
}.isRequired;
// export default Favorites;
export default Favorites;
