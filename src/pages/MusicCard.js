import React from 'react';
import propTypes from 'prop-types';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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

  handleChange = ({ target }) => {
    const { handleFavorite } = this.props;
    if (target.checked) {
      this.setState({
        checked: target.checked,
      }, handleFavorite);
    } else {
      this.setState({
        checked: target.checked,
      }, this.removeFavorite);
    }
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
    return (
      <li>
        {loading ? <Carregando /> : null }
        <p>
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
        <label htmlFor="inputTrack">
          Favorita
          <input
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
