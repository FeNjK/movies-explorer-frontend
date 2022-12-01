import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import MobileMenu from '../MobileMenu/MobileMenu';
import PageNotFound from '../PageNotFound/PageNotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { INDICATOR_OF_SHORT_MOVIE } from '../../utils/constants';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchableText, setSearchableText] = useState(
    JSON.parse(localStorage.getItem('searchableText')) || '');
  const [searchableTextOnSavedMovies, setSearchableTextOnSavedMovies] = useState(
    JSON.parse(localStorage.getItem('searchableTextOnSavedMovies')) || '');
  const [notFoundError, setNotFoundError] = useState('');
  const [checkedCheckbox, setCheckedCheckbox] = useState(
    JSON.parse(localStorage.getItem('checkedCheckbox')) || false);
  const [checkedCheckboxSavedMovies, setCheckedCheckboxSavedMovies] = useState(
    JSON.parse(localStorage.getItem('checkedCheckboxSavedMovies')) || false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoToolTipMessage, setInfoToolTipMessage] = useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState('');
  const [registration, setRegistration] = useState(null);

  const navigate = useNavigate();
  const location = useLocation()

  function handleUserDataCheck() {

    mainApi
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setAuthorizationEmail(userData.email);
        localStorage.setItem('userData', JSON.stringify(userData));
      })
      .catch((err) => {
        console.log(`Ошибка при получении пользовательских данных ${err}`);
      });

    mainApi
      .getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        setIsLoggedIn(true);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(`Ошибка при получении массива сохранённых фильмов ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(data) {
    mainApi
      .login(data)
      .then(() => {
        setIsLoggedIn(true);
        handleGetMovies();
        handleUserDataCheck();
        setAuthorizationEmail(data.email);
        localStorage.setItem('isLoggedIn', true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(`Ошибка при авторизации пользователя ${err}`);
        handleInfoToolTipMessage();
        localStorage.setItem('isLoggedIn', false);
      });
  }

  function handleRegister(data) {
    mainApi
      .register(data)
      .then(() => {
        setRegistration(true);
        handleInfoToolTipMessage();
        navigate('/signin');
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации пользователя ${err}`);
        setRegistration(false);
        handleInfoToolTipMessage();
      });
  }

  function handleUpdateUser(userData) {
    mainApi
      .editUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Ошибка с обновлением пользовательских данных ${err}`
        );
      });
  }

  function handleGetMovies() {
    setIsLoading(true);
    moviesApi
      .getBeatfilmMovies()
      .then((beatfilmMovies) => {
        localStorage.setItem('beatfilmMovies', JSON.stringify(beatfilmMovies));
      })
      .catch((err) => {
        console.log(`Ошибка с получением списка фильмов ${err}`);
        setNotFoundError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie(movie) {
    setIsLoading(true);
    mainApi
      .saveMovies(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie]);
        console.log(savedMovie.movieId)
        localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, savedMovie]));
      })
      .catch((err) => {
        console.log(`Ошибка с сохранением фильма ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteMovie(movie) {
    setIsLoading(true);
    const savedMovie = savedMovies.find((i) => i.movieId === movie.id || movie.movieId);
    console.log(savedMovie.movieId)
    mainApi
      .deleteMovies(
        location.pathname === '/movies'
        ? movie.id
        : movie.movieId
      )
      .then(() => {
        const updateSavedMovie = savedMovies.filter((c) => c.movieId !== savedMovie.movieId);
        setSavedMovies(updateSavedMovie);
        localStorage.setItem('savedMovies', JSON.stringify(updateSavedMovie));
      })
      .catch((err) => {
        console.log(`Ошибка с удалением фильма ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSearchChangeByText(e) {
    setSearchableText(e.target.value);
  }

  function handleSearchChangeByTextOnSavedMovies(e) {
    setSearchableTextOnSavedMovies(e.target.value);
  }

  function handlerFilter(beatfilmMovies) {
    return beatfilmMovies.filter((movie) => {
      if (checkedCheckbox && movie.duration > INDICATOR_OF_SHORT_MOVIE) {
        return false;
      }
      return (
        movie.nameRU.toLowerCase().includes(searchableText.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchableText.toLowerCase())
      );
    });
  }

  function handlerSavedMoviesFilter(savedMovies) {
    return savedMovies.filter((savedMovie) => {
      /* console.log(savedMovie) */
      if (checkedCheckboxSavedMovies && savedMovie.duration > INDICATOR_OF_SHORT_MOVIE) {
        return false;
      }
      return (
        savedMovie.nameRU.toLowerCase().includes(searchableTextOnSavedMovies.toLowerCase()) ||
        savedMovie.nameEN.toLowerCase().includes(searchableTextOnSavedMovies.toLowerCase())
      );
    });
  }

  function handlerSubmitOnMoviesRoute(e) {
    e.preventDefault();
    setIsLoading(true);
    if (JSON.parse(localStorage.getItem('beatfilmMovies')) === null) {
      handleGetMovies();
    } else {
      const beatfilmMovies = JSON.parse(localStorage.getItem('beatfilmMovies'));
      const searchedFilms = handlerFilter(beatfilmMovies);
      localStorage.setItem('searchableText', JSON.stringify(searchableText));
      localStorage.setItem('checkedCheckbox', checkedCheckbox);
      if (searchedFilms.length === 0) {
        setNotFoundError('Ничего не найдено');
      } else {
        setNotFoundError('');
      }
      setMovies(searchedFilms);
    }
    setIsLoading(false);
  }

  function handlerSubmitOnSavedMoviesRoute(e) {
    e.preventDefault();
    setIsLoading(true);
    if (JSON.parse(localStorage.getItem('savedMovies')) === null) {
      handleUserDataCheck();
    } else {
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const searchedSavedFilms = handlerSavedMoviesFilter(savedMovies);
      localStorage.setItem('searchableTextOnSavedMovies', JSON.stringify(searchableTextOnSavedMovies));
      localStorage.setItem('checkedCheckboxSavedMovies', checkedCheckboxSavedMovies);
      if (searchedSavedFilms.length === 0) {
        setNotFoundError('Ничего не найдено');
      } else {
        setNotFoundError('');
      }
      setSavedMovies(searchedSavedFilms);
    }
    setIsLoading(false);
  }

  function handleSearchOnDuration() {
    setCheckedCheckbox(!checkedCheckbox);
    localStorage.setItem('checkedCheckbox', !checkedCheckbox);
  }

  function handleSearchOnDurationSavedMovies() {
    setCheckedCheckboxSavedMovies(!checkedCheckboxSavedMovies);
    localStorage.setItem('checkedCheckboxSavedMovies', !checkedCheckboxSavedMovies);
  }

  useEffect(() => {
    const beatfilmMovies = JSON.parse(localStorage.getItem('beatfilmMovies'));
    if (beatfilmMovies !== null) {
      const filterResult = handlerFilter(beatfilmMovies);
      setMovies(filterResult);
    }
  }, [checkedCheckbox]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMovies !== null) {
      const filterResultOfSavedMovies = handlerSavedMoviesFilter(savedMovies);
      setSavedMovies(filterResultOfSavedMovies);
    }
  }, [checkedCheckboxSavedMovies]);

  useEffect(() => {
    if (localStorage.isLoggedIn === JSON.stringify(true)) {
      handleUserDataCheck();
      const checkedCheckbox = JSON.parse(localStorage.getItem('checkedCheckbox'));
      setCheckedCheckbox(JSON.parse(localStorage.getItem('checkedCheckbox')));
      const searchableText = JSON.parse(localStorage.getItem('searchableText'));
      setSearchableText(JSON.parse(localStorage.getItem('searchableText')));
      const beatfilmMovies = JSON.parse(localStorage.getItem('beatfilmMovies'));
      const filteredFilms = handlerFilter(
        beatfilmMovies,
        searchableText,
        checkedCheckbox,
      );
      setMovies(filteredFilms);

      const searchedFilms = handlerFilter(
        beatfilmMovies,
        searchableText,
        checkedCheckbox,
      );
      setMovies(searchedFilms);
    }
  }, []);

  function handleSignOut(e) {
    e.preventDefault();
    mainApi
      .signout()
      .then(() => {
        setIsLoggedIn(false);
        setCurrentUser({});
        setMovies([]);
        setSavedMovies([]);
        setSearchableText('');
        setCheckedCheckbox(false);
        localStorage.clear();
        navigate('/');
      })
      .catch((err) => {
        console.log(`Возникла ошибка при очистке данных ${err}`);
      });
  }

  function handleMobileMenuClick() {
    setMobileMenuOpen(true);
  }

  function handleInfoToolTipMessage() {
    setInfoToolTipMessage(true);
  }

  function closeAllPopups() {
    setMobileMenuOpen(false);
    setInfoToolTipMessage(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route
            exact
            strict
            path='/'
            element={
              <Main
                onMobileMenu={handleMobileMenuClick}
                authorizationEmail={authorizationEmail}
              />
            }
          />
          <Route
            exact
            strict
            path='/signin'
            element={
              isLoggedIn ? (
                <Navigate to='/movies' />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            exact
            strict
            path='/signup'
            element={
              isLoggedIn ? (
                <Navigate to='/signin' />
              ) : (
                <Register onRegister={handleRegister} />
              )
            }
          />
          <Route
            exact
            strict
            path='/movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  onMobileMenu={handleMobileMenuClick}
                  authorizationEmail={authorizationEmail}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  notFoundError={notFoundError}
                  movies={movies}
                  savedMovies={savedMovies}
                  handlerSubmit={handlerSubmitOnMoviesRoute}
                  searchableText={searchableText}
                  handleChange={handleSearchChangeByText}
                  checkedCheckbox={checkedCheckbox}
                  onChangeCheckbox={handleSearchOnDuration}
                  onMovieSave={handleSaveMovie}
                  onMovieDelete={handleDeleteMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            strict
            path='/saved-movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies
                  onMobileMenu={handleMobileMenuClick}
                  authorizationEmail={authorizationEmail}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  notFoundError={notFoundError}
                  movies={movies}
                  savedMovies={savedMovies}
                  handlerSubmit={handlerSubmitOnSavedMoviesRoute}
                  searchableText={searchableTextOnSavedMovies}
                  handleChange={handleSearchChangeByTextOnSavedMovies}
                  checkedCheckbox={checkedCheckboxSavedMovies}
                  onChangeCheckbox={handleSearchOnDurationSavedMovies}
                  onMovieDelete={handleDeleteMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            strict
            path='/profile'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onMobileMenu={handleMobileMenuClick}
                  authorizationEmail={authorizationEmail}
                  isSignOut={handleSignOut}
                  isLoggedIn={isLoggedIn}
                  editUser={handleUpdateUser}
                />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeAllPopups}
          authorizationEmail={authorizationEmail}
        />
        <InfoTooltip
          isOpen={infoToolTipMessage}
          onClose={closeAllPopups}
          isRegistrationGood={registration}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
