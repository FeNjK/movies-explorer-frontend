/* import { useState } from 'react'; */
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../utils/Movies';

function MoviesCardList() {

  return (
    <section className='movies-library'>
      <ul className='movies-library__card-list'>
        {movies.map((movie) => {
          return <MoviesCard movie={movie} key={movie.index} />
        })}
      </ul>
    </section>
  )
}

export default MoviesCardList;