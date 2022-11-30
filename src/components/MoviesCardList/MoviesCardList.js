import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  LARGE_PAGE_SIZE,
  MEDIUM_PAGE_SIZE,
  QUANTITY_MOVIES_LARGE,
  QUANTITY_MOVIES_MEDIUM,
  QUANTITY_MOVIES_SMALL,
  BIG_STEP,
  SMALL_STEP,
} from '../../utils/constants';

function MoviesCardList({ movies, savedMovies, onMovieDelete, onMovieSave }) {
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [quantityMovies, setQuantityMovies] = useState(0);
  const [step, makeStep] = useState(0);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    if (width > LARGE_PAGE_SIZE) {
      setQuantityMovies(QUANTITY_MOVIES_LARGE);
      makeStep(BIG_STEP);
    } else if (width < LARGE_PAGE_SIZE && width > MEDIUM_PAGE_SIZE) {
      setQuantityMovies(QUANTITY_MOVIES_MEDIUM);
      makeStep(SMALL_STEP);
    } else if (width <= MEDIUM_PAGE_SIZE) {
      setQuantityMovies(QUANTITY_MOVIES_SMALL);
      makeStep(SMALL_STEP);
    }
  }, [width, setQuantityMovies, makeStep]);

  function handleShowMoreMovies() {
    setQuantityMovies((movies) => movies + step);

    /* console.log(movies.length);
    console.log(quantityMovies); */
  }

  let moviesRoute = location.pathname = '/movies';

  let visibleButtonMore =
    'movies-library__button-more movies-library__button-more_visible app__buttons';
  let unVisibleButtonMore =
    'movies-library__button-more app__buttons';

  return (
    <section className='movies-library'>
      {
        (moviesRoute ? (
          <>
            <ul className='movies-library__card-list'>
              {movies.slice(0, quantityMovies).map((movie) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={movie.id}
                    savedMovies={savedMovies}
                    onMovieSave={onMovieSave}
                    onMovieDelete={onMovieDelete}
                  />
                );
              })}
            </ul>
            <button
              title='button'
              className={
                movies.length <= quantityMovies
                  ? unVisibleButtonMore
                  : visibleButtonMore
              }
              onClick={handleShowMoreMovies}
            >
              Ещё
            </button>
          </>
        ) : (
          <>
            <ul className='movies-library__card-list'>
              {savedMovies.slice(0, quantityMovies).map((movie) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={movie.movieId}
                    savedMovies={savedMovies}
                    onMovieSave={onMovieSave}
                    onMovieDelete={onMovieDelete}
                  />
                );
              })}
            </ul>
            <button
              title='button'
              className={
                movies.length <= quantityMovies
                  ? unVisibleButtonMore
                  : visibleButtonMore
              }
              onClick={handleShowMoreMovies}
            >
              Ещё
            </button>
          </>
        ))
      }
    </section>
  );

  /* 
  if (moviesRoute) {
    return (
      <section className='movies-library'>
        <ul className='movies-library__card-list'>
              {movies.slice(0, quantityMovies).map((movie) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={movie.id}
                    savedMovies={savedMovies}
                    onMovieSave={onMovieSave}
                    onMovieDelete={onMovieDelete}
                  />
                );
              })}
            </ul>
            <button
              title='button'
              className={
                movies.length <= quantityMovies
                  ? unVisibleButtonMore
                  : visibleButtonMore
              }
              onClick={handleShowMoreMovies}
            >
              Ещё
            </button>
      </section>
    )
  } else {
    <section className='movies-library'>
      <ul className='movies-library__card-list'>
              {savedMovies.slice(0, quantityMovies).map((movie) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={movie.id}
                    savedMovies={savedMovies}
                    onMovieSave={onMovieSave}
                    onMovieDelete={onMovieDelete}
                  />
                );
              })}
            </ul>
            <button
              title='button'
              className={
                movies.length <= quantityMovies
                  ? unVisibleButtonMore
                  : visibleButtonMore
              }
              onClick={handleShowMoreMovies}
            >
              Ещё
            </button>
    </section> */

    /* <ul className='movies-library__card-list'>
              {movies.slice(0, quantityMovies).map((movie) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={moviesRoute ? movie.id : movie.movieId}
                    savedMovies={savedMovies}
                    onMovieSave={onMovieSave}
                    onMovieDelete={onMovieDelete}
                  />
                );
              })}
            </ul>
            <button
              title='button'
              className={
                movies.length <= quantityMovies
                  ? unVisibleButtonMore
                  : visibleButtonMore
              }
              onClick={handleShowMoreMovies}
            >
              Ещё
            </button> */
}

export default MoviesCardList;
