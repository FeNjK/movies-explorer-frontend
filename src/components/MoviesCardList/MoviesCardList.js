import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  onMovieDelete,
  onMovieSave
}) {

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
    </section>
  )
}

export default MoviesCardList;