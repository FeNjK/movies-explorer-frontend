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
  const [savedMovies, setSavedMovies] = useState([]);
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
        /* console.log(userData) */
        localStorage.setItem('userData', JSON.stringify(userData));
      })
      .catch((err) => {
        console.log(
          `Ошибка при получении пользовательских данных ${err}`
        );
      });

    mainApi
      .getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        localStorage.setItem('movies', JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(
          `Ошибка при получении массива сохранённых фильмов ${err}`
        );
      });
  }

  useEffect(() => {
    if (localStorage.isLoggedIn === true) {
      handleDataCheck();
      /* console.log(localStorage) */
    }
  }, []);

  /* useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, [isLoggedIn, navigate]); */

  /* useEffect(() => {
    // Запрос к Api за информацией о пользователе
    // и массиве карточек выполняется единожды, при монтировании
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          localStorage.setItem('userData', JSON.stringify(userData));
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(
            `Тут какая-то ошибка с получением пользовательских данных ${err}`
          );
        });

      setIsLoading(true)
      mainApi
        .getSavedMovies()
        .then((moviesCards) => {
          setSavedMovies(moviesCards);
        })
        .catch((err) => {
          console.log(
            `Тут какая-то ошибка с получением массива сохранённых фильмов ${err}`
          );
        });
      .finally(() => {
          setIsLoading(false)
        });
    }
  }, [isLoggedIn]); */

  /* useEffect(() => {
    if (localStorage.isLoggedIn === true) {
      console.log(localStorage.isLoggedIn);
    }
  }, [isLoggedIn, navigate]); */

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
        navigate('/signin'); // глянуть ТЗ, может сразу на фильмы отправить...
      })
      .catch((err) => {
        console.log(`Возникла ошибка при регистрации пользователя ${err}`);
        setRegistration(false);
        handleInfoToolTipMessage();
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    navigate('/');
  }

  function handleGetMovies() {
    moviesApi
      .getMovies()
      .then((moviesData) => {
        localStorage.setItem('movies', JSON.stringify(moviesData));
      })
      .catch((err) => {
        console.log(`Тут какая-то ошибка с получением списка фильмов ${err}`);
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
          {/* <Route>
            {isLoggedIn ? <Navigate to='/' /> : <Navigate to='/signin' />}
          </Route> */}
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
