import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard({ movie, onMovieDelete, onMovieSave }) {
  const location = useLocation();
  const [isSaved, setSave] = useState(false); // не доделано. Надо поднять в App.js

  const movieSaveButtonClassName = `movie__mark ${isSaved ? 'movie__mark_active' : ''}`;

  function handleSaveMovie() {
    onMovieSave(movie);
  }

  function handleDeleteMovie() {
    onMovieDelete(movie);
  }

  function handleMovieDuration(duration) {
    if (duration < 60) {
      return `${movie.duration % 60}м`
      } if (duration === 60) {
        return `${Math.floor(movie.duration / 60)}ч`
      }
      return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`
    }

  return (
    <li className='movie-card'>
      <a
        href={movie.trailerLink}
        className='movie-card__link'
        target='_blank'
        rel='noreferrer'
        title='Перейти к ролику в Ютюбе?'
      >
        <img
          className='movie-card__image'
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU}
        />
      </a>
        <h2 className='movie__title'>{movie.nameRU}</h2>
        <p className='movie__duration'>{handleMovieDuration(movie.duration)}</p>
      {location.pathname === '/movies' && (
        <button
          className={movieSaveButtonClassName}
          type='button'
          onClick={handleSaveMovie}
        />
      )}
      {location.pathname === '/saved-movies' && (
        <button
          className='movie__trash'
          type='button'
          onClick={handleDeleteMovie}
        />
      )}
      
    </li>
  );
}
export default MoviesCard;
