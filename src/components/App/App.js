import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';

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
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchableText, setSearchableText] = useState('');
  const [notFoundError, setNotFoundError] = useState('');
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoToolTipMessage, setInfoToolTipMessage] = useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState('');
  const [registration, setRegistration] = useState(null);

  const navigate = useNavigate();

  function handleDataCheck() {
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
      .then((userMovies) => {
        setSavedMovies(userMovies);
        setIsLoggedIn(true);
        localStorage.setItem('userMovies', JSON.stringify(userMovies));
      })
      .catch((err) => {
        console.log(`Ошибка при получении массива сохранённых фильмов ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
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
          `Тут какая-то ошибка с обновлением пользовательских данных ${err}`
        );
      });
  }

  function handleLogin(data) {
    mainApi
      .login(data)
      .then(() => {
        setIsLoggedIn(true);
        handleGetMovies();
        setAuthorizationEmail(data.email);
        localStorage.setItem('isLoggedIn', true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(`Возникла ошибка при авторизации пользователя ${err}`);
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
        console.log(`Возникла ошибка при регистрации пользователя ${err}`);
        setRegistration(false);
        handleInfoToolTipMessage();
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
        console.log(`Тут какая-то ошибка с получением списка фильмов ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Во входных данных мы вводим значение атрибута onChange
  // в качестве ниже указанной функции
  function handleSearchChangeByText(e) {
    setSearchableText(e.target.value);
  }

  function handlerFilter(beatfilmMovies) {
    return beatfilmMovies.filter((movie) => {
      if (!checkedCheckbox && movie.duration > 40) {
        return false;
      }
      return (
        movie.nameRU.toLowerCase().includes(searchableText.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchableText.toLowerCase())
      );
    })
  }

  function handlerSubmitOnMoviesRoute(e) {
    e.preventDefault();
    setIsLoading(true);
    const beatfilmMovies = JSON.parse(localStorage.getItem('beatfilmMovies'));
    const searchedFilms = handlerFilter(beatfilmMovies);
    console.log(searchedFilms);
    localStorage.setItem('searchableText', JSON.stringify(searchableText));
    localStorage.setItem('checkedCheckbox', JSON.stringify(false));
    if (searchedFilms.length === 0) {
      setNotFoundError('Ничего не найдено');
    } else {
      setNotFoundError ('');
    }
    setMovies(searchedFilms);
    /* handleSearchOnDuration(searchedFilms) */
    setIsLoading(false);
    }

    /* function handleSearchChangeByСheckbox(e) {
      setSearchableText(e.target.value);
      console.log(e.target.value);
    } */
  
  function handleSearchOnDuration() {
    setIsLoading(true);
    setCheckedCheckbox(!checkedCheckbox);
    const beatfilmMovies = JSON.parse(localStorage.getItem('beatfilmMovies'));
    if (!checkedCheckbox) {
      const searchedShortFilms = beatfilmMovies.filter((movie) => {
        return movie.duration <= 40;
      })
      localStorage.setItem('searchableText', JSON.stringify(searchableText));
      localStorage.setItem('checkedCheckbox', JSON.stringify(true));
      console.log(searchedShortFilms);
      setMovies(searchedShortFilms);
    } else {
      setCheckedCheckbox(!checkedCheckbox);
      const searchedLongFilms = handlerFilter(beatfilmMovies);
      localStorage.setItem('searchableText', JSON.stringify(searchableText));
      localStorage.setItem('checkedCheckbox', JSON.stringify(false));
      console.log(searchedLongFilms);
      setMovies(searchedLongFilms);
    }
    setIsLoading(false);
  }

  /* function handleSearchOnDuration() {
    setIsLoading(true);
    setCheckedCheckbox(!checkedCheckbox);
    const beatfilmMovies = JSON.parse(localStorage.getItem('beatfilmMovies'));
    const searchedShortFilms = handlerFilter(beatfilmMovies);
    console.log(searchedShortFilms);
    localStorage.setItem('searchableText', JSON.stringify(searchableText));
    if (localStorage.checkedCheckbox === 'false') {
      setCheckedCheckbox(checkedCheckbox);
      localStorage.setItem('checkedCheckbox', JSON.stringify(true));
    } else {
      localStorage.setItem('checkedCheckbox', JSON.stringify(false));
    }

    if (searchedShortFilms.length === 0) {
      setNotFoundError('Ничего не найдено');
    } else {
      setNotFoundError ('');
    }
    setMovies(searchedShortFilms);
    setIsLoading(false);
  } */

  useEffect(() => {
    if (localStorage.isLoggedIn === JSON.stringify(true)) {
      handleDataCheck();
      handleGetMovies();

      /* if (localStorage.checkedCheckbox === JSON.stringify(true)) {
        setCheckedCheckbox(!checkedCheckbox);
      }
      setCheckedCheckbox(checkedCheckbox); */

      setSearchableText(JSON.parse(localStorage.getItem('searchableText')));
      const searchableText = JSON.parse(localStorage.getItem('searchableText'));
      const beatfilmMovies = JSON.parse(localStorage.getItem('beatfilmMovies'));
      const filteredFilms = handlerFilter(beatfilmMovies, searchableText);
      setMovies(filteredFilms);
    }
  }, []);
  
  function handleSignOut() {
    mainApi
      .signout()
      .then(() => {
        setIsLoggedIn(false);
        setCurrentUser({});
        setMovies([]);
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
                  handlerSubmit={handlerSubmitOnMoviesRoute}
                  searchableText={searchableText}
                  handleChange={handleSearchChangeByText}
                  checkedCheckbox={checkedCheckbox}
                  onChangeCheckbox={handleSearchOnDuration}
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
