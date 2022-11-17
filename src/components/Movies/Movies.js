import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';

function Movies({ isLoggedIn, movies, onMobileMenu, authorizationEmail }) {
  const location = useLocation();

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onMobileMenu={onMobileMenu}
        authorizationEmail={authorizationEmail}
      />
      <main className='movies'>
        <SearchForm />
        <MoviesCardList movies={movies} />
        {location.pathname === '/movies' && (
          <button className='movies__button-more app__buttons'>Ещё</button>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
