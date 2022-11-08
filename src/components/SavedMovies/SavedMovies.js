import './SavedMovies.css'
import Header from '../Header/Header';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer';

function SavedMovies({ isLoggedIn, movies }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='movies'>
        <MoviesCardList movies={movies} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;