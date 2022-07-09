import React from 'react';
import propTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    this.handleGetFavoritesFunction();
  }

  handleChange = ({ target }) => {
    const { handleFavorite } = this.props;
    this.setState({
      checked: target.checked,
    }, handleFavorite);
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
    const { checked } = this.state;
    return (
      <li>
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
