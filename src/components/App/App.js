import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';

import mainApi from '../../utils/MainApi';
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
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoToolTipMessage, setInfoToolTipMessage] = useState(false);
  const [authorizationEmail, setAuthorizationEmail] = useState('');
  const [registration, setRegistration] = useState(null);

  const navigate = useNavigate();

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    mainApi
      .getToken(jwt)
      console.log(jwt)
      .then((data) => {
        console.log(data);
        console.log(data.email);
        setAuthorizationEmail(data.email);
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, [isLoggedIn, navigate]);

  function handleLogin(data) {
    mainApi
      .login(data)
      .then((res) => {
        setIsLoggedIn(true);
        console.log(data.email);
        setAuthorizationEmail(data.email);
        localStorage.setItem('jwt', res.token);
        console.log(res.token);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(`Возникла ошибка при авторизации пользователя ${err}`);
        handleInfoToolTipMessage();
      });
  }

  function handleRegister(data) {
    mainApi
      .register(data)
      .then(() => {
        /* console.log(data); */
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
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    // Запрос к Api за информацией о пользователе
    // и массиве карточек выполняется единожды, при монтировании
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(
            `Тут какая-то ошибка с получением пользовательских данных ${err}`
          );
        });

        /* mainApi
        .getInitialCards()
        .then((card) => {
          setCards(card);
        })
        .catch((err) => {
          console.log(
            `Тут какая-то ошибка с получением массива карточек ${err}`
          );
        }); */
    }
  }, [isLoggedIn]);

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
              isLoggedIn
              ? <Navigate to='/movies' />
              : <Login
                onLogin={handleLogin}
                />
            }
          />
          <Route
            exact
            strict
            path='/signup'
            element={
              isLoggedIn
              ? <Navigate to='/signin' />
              : <Register
                onRegister={handleRegister}
              />
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
          <Route
            path='*'
            element={
              <PageNotFound />
            }
          />
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
