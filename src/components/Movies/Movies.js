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
  savedMovies,
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
              savedMovies={savedMovies}
              onMovieDelete={onMovieDelete}
              onMovieSave={onMovieSave}
            />
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
