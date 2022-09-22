import React from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.handleGetFavoritesFunction();
  }

  handleChange = async ({ target }) => {
    const { disc } = this.props;

    if (target.checked) {
      this.setState({
        checked: target.checked,
      });
    } else {
      this.setState({
        checked: target.checked,
      }, this.removeFavorite);
    }

    await addSong(disc);
  }

  removeFavorite = async () => {
    const { disc } = this.props;
    this.setState({
      loading: true,
    });
    await removeSong(disc);
    this.setState({
      loading: false,
    });
  }

  handleGetFavoritesFunction = async () => {
    const { disc } = this.props;
    const newFavorite = await getFavoriteSongs();
    const check = newFavorite.some((music) => music.trackId === disc.trackId);

    this.setState({
      checked: check,
    });
  }

  render() {
    const { disc } = this.props;
    const { trackName, previewUrl, trackId } = disc;
    const { checked, loading } = this.state;
    // console.log(disc);
    return (
      <li>
        {loading ? <Carregando /> : null }
        <p className="subtitle is-5">
          {' '}
          {trackName}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
        <label className="favMusic" htmlFor="inputTrack">
          Favorita
          <input
            value={ disc.trackId }
            name="inputTrack"
            type="checkbox"
            checked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  disc: propTypes.object,
  handleFavorite: propTypes.func,
  song: propTypes.object,
}.isRequired;

export default MusicCard;
