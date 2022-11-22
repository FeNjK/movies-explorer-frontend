import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  onMovieDelete,
  onMovieSave
}) {

  const [width, setWidth] = useState(window.innerWidth);
  const [step, makeStep] = useState(0);
  const [quantityMovies, setQuantityMovies] = useState(movies);

  const LARGE_PAGE = 1023;
  const MEDIUM_PAGE = 700;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  });

  function changingRenderElementsQuantity() {

  }

  function handleShowMoreMovies() {

  }

  return (
    <section className='movies-library'>
      <ul className='movies-library__card-list'>
        {movies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={
                movie.id
                ? movie.id
                : movie.movieId
              }
              onMovieSave={onMovieSave}
              onMovieDelete={onMovieDelete}
            />
          );
        })}
      </ul>
      <button
        title='button'
        className='movies-library__button-more app__buttons'
        onClick={handleShowMoreMovies}
      >
        Ещё
      </button>
    </section>
  )
}

export default MoviesCardList;