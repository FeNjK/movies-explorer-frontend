import './Movies.css';
import { useEffect } from 'react';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer';

function Movies({
  isLoading,
  isLoggedIn,
  notFoundError,
  movies,
  handlerSubmit,
  searchableText,
  handleChange,
  checkedCheckbox,
  onChangeCheckbox,
  onMovieDelete,
  onMovieSave,
  onMobileMenu,
  authorizationEmail,
}) {

  useEffect(() => {
    document.title = 'Фильмы';
  }, []);

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
          checkedCheckbox={checkedCheckbox}
          onChangeCheckbox={onChangeCheckbox}
        />
        {isLoading && <Preloader />}
        {!isLoading && movies.length > 0 && (
          <>
            <MoviesCardList
              movies={movies}
              onMovieDelete={onMovieDelete}
              onMovieSave={onMovieSave}
            />
            {/* <button
              className='movies__button-more app__buttons'
            >
              Ещё
            </button>  */}
          </>
        )}
        {notFoundError && movies.length === 0 && (
          <h2 className='movies__not-found-error'>{notFoundError}&#128577;</h2>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
