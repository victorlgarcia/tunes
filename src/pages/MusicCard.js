import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, handleFavorite } = this.props;
    // console.log(disc);
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
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ handleFavorite }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  disc: propTypes.object,
  handleFavorite: propTypes.func,
}.isRequired;

export default MusicCard;
