import './Movies.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';

function Movies({
  isLoading,
  isLoggedIn,
  movies,
  handlerSubmit,
  searchableText,
  handleChange,
  checked,
  onCheckbox,
  onMovieDelete,
  onMovieSave,
  onMobileMenu,
  authorizationEmail,
}) {
  const location = useLocation();

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onMobileMenu={onMobileMenu}
        authorizationEmail={authorizationEmail}
      />
      <main className='movies'>
        <SearchForm
          handlerSubmit={handlerSubmit}
          searchableText={searchableText}
          handleChange={handleChange}
          isLoading={isLoading}
          checked={checked}
          onCheckbox={onCheckbox}
        />
        {isLoading && movies.length > 0 ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList
              movies={movies}
              onMovieDelete={onMovieDelete}
              onMovieSave={onMovieSave}
            />
            {location.pathname === '/movies' && (
              <button
                className='movies__button-more app__buttons'
              >
                Ещё
              </button>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
