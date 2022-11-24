import './MoviesCardList.css';
import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onMovieDelete, onMovieSave }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [quantityMovies, setQuantityMovies] = useState(0);
  const [step, makeStep] = useState(0);

  // Константы надо перенести в отдельный файл
  const LARGE_PAGE_SIZE = 1178;
  const MEDIUM_PAGE_SIZE = 700;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setTimeout(handleResizeWindow, 2000)
    });
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  });

  useEffect(() => {
    if (width > LARGE_PAGE_SIZE) {
      setQuantityMovies(12);
      makeStep(3);
  } else if (width < LARGE_PAGE_SIZE && width > MEDIUM_PAGE_SIZE) {
      setQuantityMovies(8);
      makeStep(2);
    } else if (width <= MEDIUM_PAGE_SIZE) {
      setQuantityMovies(5);
      makeStep(2);
    }
  }, [width]);


  function handleShowMoreMovies() {
    setQuantityMovies((movies) => movies + step);
    
    /* console.log(movies.length);
    console.log(quantityMovies); */
  };

  let visibleButtonMore =
    'movies-library__button-more movies-library__button-more_visible app__buttons';
  let unVisibleButtonMore = 
    'movies-library__button-more app__buttons';

  return (
    <section className='movies-library'>
      <ul className='movies-library__card-list'>
        {movies.slice(0, quantityMovies).map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={movie.id ? movie.id : movie.movieId}
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
  );
}

export default MoviesCardList;
