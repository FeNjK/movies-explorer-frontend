import './SavedMovies.css';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer';

function SavedMovies({
  isLoading,
  isLoggedIn,
  movies,
  onMovieDelete,
  onMovieSave,
  onMobileMenu,
  authorizationEmail,
}) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onMobileMenu={onMobileMenu}
        authorizationEmail={authorizationEmail}
      />
      <main className='saved-movies'>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <SearchForm />
            <MoviesCardList
              movies={movies}
              onMovieDelete={onMovieDelete}
              onMovieSave={onMovieSave}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
