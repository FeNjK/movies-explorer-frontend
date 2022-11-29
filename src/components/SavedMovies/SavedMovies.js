import './SavedMovies.css';
import { useEffect } from 'react';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer';

function SavedMovies({
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
  onMovieSave,
  onMovieDelete,
  onMobileMenu,
  authorizationEmail,
}) {

  useEffect(() => {
    document.title = 'Понравившиеся вам фильмы';
  }, []);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onMobileMenu={onMobileMenu}
        authorizationEmail={authorizationEmail}
      />
      <main className='saved-movies'>
      <SearchForm
          handlerSubmit={handlerSubmit}
          searchableText={searchableText}
          handleChange={handleChange}
          isLoading={isLoading}
          checkedCheckbox={checkedCheckbox}
          onChangeCheckbox={onChangeCheckbox}
        />
        {isLoading && <Preloader />}
        {!isLoading && savedMovies.length > 0 && (
          <>
            <MoviesCardList
              movies={movies}
              savedMovies={savedMovies}
              onMovieDelete={onMovieDelete}
              onMovieSave={onMovieSave}
            />
          </>
        )}
        {notFoundError && savedMovies.length === 0 && (
          <h2 className='movies__not-found-error'>{notFoundError}&#128577;</h2>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
