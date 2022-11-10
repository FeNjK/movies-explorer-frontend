import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
/* import apiAuth from '../../utils/ApiAuth'; */
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import MobileMenu from '../MobileMenu/MobileMenu';
import './App.css';

function App() {
  // сделать асинхронные GET- и POST-запросы к API на 3 этапе
  // написать все запросы к нашему и стороннему API на 3 этапе
  // защитить роуты /saved-movies, /profile и /movies авторизацией

  // передрать с макета или создать свои карточки с фильмами для теста

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  /* const [authorizationEmail, setAuthorizationEmail] = useState('');
  const [registration, setRegistration] = useState(null); */

  /* const navigate = useNavigate();

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }

    apiAuth
      .getEmail(jwt)
      .then((data) => {
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
      navigate('/'); // или на '/movies' ?!.
    }
  }, [isLoggedIn, navigate]);

  function handleLogin(data) {
    apiAuth
      .autorise(data)
      .then((res) => {
        setIsLoggedIn(true);
        console.log(res.token);
        setAuthorizationEmail(data.email);
        localStorage.setItem('jwt', res.token);
        navigate('/');
      })
      .catch((err) => {
        console.log(`Возникла ошибка при авторизации пользователя ${err}`);
        handleInfoToolTipMessage();
      });
  }

  function handleRegister(data) {
    apiAuth
      .register(data)
      .then(() => {
        setRegistration(true);
        handleInfoToolTipMessage();
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(`Возникла ошибка при регистрации пользователя ${err}`);
        setRegistration(false);
        handleInfoToolTipMessage();
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/');
  } */

  function handleMobileMenuClick() {
    setMobileMenuOpen(true);
  }

  function closeAllPopups() {
    setMobileMenuOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route exact strict path='/' element={<Main />}/>
          <Route exact strict path='/sign-in' element={<Login /* onLogin={handleLogin}  *//>}/>
          <Route exact strict path='/sign-up' element={<Register /* onRegister={handleRegister}  *//>}/>
          <Route exact strict path='/movies' element={<Movies /* movies={movies} */ /* isLoggedIn={isLoggedIn} */ />}/>
          <Route exact strict path='/saved-movies' element={<SavedMovies /* movies={movies} */ isLoggedIn={isLoggedIn} />}/>
          <Route exact strict path='/profile' element={<Profile isLoggedIn={isLoggedIn} /* isSignOut={handleSignOut} *//>}/>
        </Routes>
        <MobileMenu isOpen={isMobileMenuOpen} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
