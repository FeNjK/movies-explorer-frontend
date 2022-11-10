import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard({ movie }) {
  const location = useLocation();
  const [isLiked, setLike] = useState(false);
  /* const [isSaved, setSave] = useState(false); */

  /* const movieDeleteButtonClassName = (
    `movie__trash ${isOwn ? 'movie__trash_visible' : 'movie__trash_hidden'}`
  ); */

  /* const movieLikeButtonClassName = (
    `movie__mark ${isLiked ? 'movie__mark_active' : ''}`
  ) */

  function handleMovieLike(e) {
    e.target.classList.toggle('movie__mark_active');
  }

  return (
    <li className='movie-card'>
      <img
        className='movie-card__image'
        src={movie.image}
        alt={movie.nameRu}
      />
      <h2 className='movie__title'>{movie.nameRu}</h2>
      <p className='movie__duration'>{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
      {location.pathname === '/movies' && (
        <button
          /* className={movieLikeButtonClassName} */
          className={`movie__mark ${isLiked ? 'movie__mark_active' : ''}`}
          type='button'
          onClick={handleMovieLike}
        />
      )}
      {location.pathname === '/saved-movies' && (
        <button
          className='movie__trash'
          type='button'
        />
      )}
    </li>
  );
}
export default MoviesCard;
