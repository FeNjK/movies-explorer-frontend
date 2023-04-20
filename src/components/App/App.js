import { useEffect, useState } from 'react';
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

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
  // данные и их обработка
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchableText, setSearchableText] = useState(
    JSON.parse(localStorage.getItem('searchableText')) || ''
  );
  const [searchableTextOnSavedMovies, setSearchableTextOnSavedMovies] =
    useState(
      JSON.parse(localStorage.getItem('searchableTextOnSavedMovies')) || ''
    );
  const [checkedCheckbox, setCheckedCheckbox] = useState(
    JSON.parse(localStorage.getItem('checkedCheckbox')) || false
  );
  const [checkedCheckboxSavedMovies, setCheckedCheckboxSavedMovies] = useState(
    JSON.parse(localStorage.getItem('checkedCheckboxSavedMovies')) || false
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // представление данных и интерфейс
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // обработка ошибок
  const [notFoundError, setNotFoundError] = useState('');
  const [infoToolTipMessage, setInfoToolTipMessage] = useState(false);
  const [messageToUser, setMessageToUser] = useState('');
  const [allGoodStatus, setAllGoodStatus] = useState(false);

  // навигация
  const navigate = useNavigate();
  const location = useLocation();
  const allowedLocation = location.pathname;

  // функционал приложения
  async function handleUserDataCheck() {
    await mainApi
      .getUserInfo()
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate(allowedLocation);
      })
      .catch((err) => {
        console.log(`Ошибка при получении пользовательских данных ${err}`);
        handleSignOut();
      });

    await mainApi
      .getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(`Ошибка при получении массива сохранённых фильмов ${err}`);
        handleSignOut();
      });
  }
  
  useEffect(() => {
    if (localStorage.isLoggedIn === JSON.stringify(true)) {
      handleUserDataCheck();
    }
  }, []);

  function handleLogin(data) {
    mainApi
      .login(data)
      .then(() => {
        setIsLoggedIn(true);
        handleUserDataCheck();
        setCurrentUser(data.email);
        localStorage.setItem('isLoggedIn', true);
        navigate('/movies');
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setAllGoodStatus(false);
        handleInfoToolTipMessage();
        if (err.message.includes('401')) {
          setMessageToUser(
            `${err}. Проверьте правильность введённых вами данных.`
          );
        } else {
          handleSignOut();
          console.log(`${err}. Ошибка при авторизации пользователя.`);
        }
        navigate('/signin');
      });
  }

  function handleRegister(data) {
    mainApi
      .register(data)
      .then(() => {
        handleLogin(data);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setAllGoodStatus(false);
        handleInfoToolTipMessage();
        if (err.message.includes('409')) {
          setMessageToUser(
            `${err}. Пользователь с таким email уже существует.`
          );
        } else {
          handleSignOut();
          console.log(`${err}. Ошибка при регистрации пользователя.`);
        }
        navigate('/signup');
      });
  }

  function handleSignOut() {
    setIsLoading(true);
    mainApi
      .signout()
      .then(() => {
        localStorage.clear();
        setIsLoggedIn(false);
        setCurrentUser({});
        setMovies([]);
        setSavedMovies([]);
        setSearchableText('');
        setCheckedCheckbox(false);
        setSearchableTextOnSavedMovies('');
        setCheckedCheckboxSavedMovies(false);
        setInfoToolTipMessage(false);
        setMessageToUser('');
        setAllGoodStatus(false);
        navigate('/');
      })
      .catch((err) => {
        setMessageToUser(
          `${err}. Повреждены или отсутствуют куки. Обратитесь к администратору сайта.`
        );
        navigate('/');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(userData) {
    mainApi
      .editUserInfo(userData)
      .then((newUserData) => {
        handleUserDataCheck();
        setCurrentUser(newUserData);
        setAllGoodStatus(true);
        handleInfoToolTipMessage();
        setMessageToUser(`Ваши учетные данные успешно обновлены.`);
      })
      .catch((err) => {
        setAllGoodStatus(false);
        handleInfoToolTipMessage();
        if (err.message.includes('409')) {
          setMessageToUser(
            `${err}. Пользователь с таким email уже существует.`
          );
        } else {
          handleSignOut();
          console.log(`${err} Ошибка при редактировании данных пользователя.`);
        }
      });
  }

  async function handleGetMovies() {
    setIsLoading(true);
    await moviesApi
      .getBeatfilmMovies()
      .then((beautyFilmMovies) => {
        setMovies(beautyFilmMovies);
        localStorage.setItem('beautyFilmMovies', JSON.stringify(beautyFilmMovies));
      })
      .catch((err) => {
        if (err.message.includes('401')) {
          handleSignOut();
          console.log(`Проблемы с авторизацией при получении списка фильмов. ${err}`);
        } else {
          console.log(`Ошибка с получением списка фильмов ${err}`);
          setNotFoundError(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        }
        navigate('/signin');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .saveMovies(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie]);
        localStorage.setItem('savedMovies',JSON.stringify([...savedMovies, savedMovie]));
      })
      .catch((err) => {
        if (err.message.includes('401')) {
          handleSignOut();
          console.log(`Проблемы с авторизацией при попытке сохранения фильма. ${err}`);
        } else {
          setAllGoodStatus(false);
          handleInfoToolTipMessage();
          setMessageToUser(`${err}. Ошибка при сохранении фильма.`);
        }
      });
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (i) =>
        i.movieId ===
        (location.pathname === '/movies' ? movie.id : movie.movieId)
    );
    mainApi
      .deleteMovies(location.pathname === '/movies' ? movie.id : movie.movieId)
      .then(() => {
        const updateSavedMovie = savedMovies.filter(
          (c) => c.movieId !== savedMovie.movieId
        );
        setSavedMovies(updateSavedMovie);
        localStorage.setItem('savedMovies', JSON.stringify(updateSavedMovie));
      })
      .catch((err) => {
        if (err.message.includes('401')) {
          handleSignOut();
          console.log(`Проблемы с авторизацией при попытке удаления фильма. ${err}`);
        } else {
          setAllGoodStatus(false);
          handleInfoToolTipMessage();
          setMessageToUser(`${err}. Ошибка при удалении фильма.`);
        }
      });
  }

  function handleSearchChangeByText(e) {
    setSearchableText(e.target.value);
  }

  function handleSearchChangeByTextOnSavedMovies(e) {
    setSearchableTextOnSavedMovies(e.target.value);
  }

  function handlerFilter(beautyFilmMovies) {
    return beautyFilmMovies.filter((movie) => {
      if (checkedCheckbox && movie.duration > INDICATOR_OF_SHORT_MOVIE) {
        return false;
      }
      return (
        movie
          .nameRU
          .toLowerCase()
          .includes(searchableText.toLowerCase()) ||
        movie
          .nameEN
          .toLowerCase()
          .includes(searchableText.toLowerCase())
      );
    });
  }

  function handlerSavedMoviesFilter(savedMovies) {
    return savedMovies.filter((savedMovie) => {
      if (
        checkedCheckboxSavedMovies &&
        savedMovie.duration > INDICATOR_OF_SHORT_MOVIE
      ) {
        return false;
      }
      return (
        savedMovie
          .nameRU
          .toLowerCase()
          .includes(searchableTextOnSavedMovies.toLowerCase()) ||
        savedMovie
          .nameEN
          .toLowerCase()
          .includes(searchableTextOnSavedMovies.toLowerCase())
      );
    });
  }

  async function handlerSubmitOnMoviesRoute(e) {
    e.preventDefault();
    if (searchableText === '') {
      return;
    } else {
      setIsLoading(true);
      if (JSON.parse(localStorage.getItem('beautyFilmMovies')) === null) {
        await handleGetMovies();
      }
      const beautyFilmMovies = JSON.parse(localStorage.getItem('beautyFilmMovies'));
      const searchedFilms = handlerFilter(beautyFilmMovies);
      localStorage.setItem('searchableText', JSON.stringify(searchableText));
      localStorage.setItem('checkedCheckbox', checkedCheckbox);
      if (searchedFilms.length === 0) {
        setNotFoundError('Ничего не найдено');
      } else {
        setNotFoundError('');
      }
      setMovies(searchedFilms);
      setIsLoading(false);
    }
  }

  async function handlerSubmitOnSavedMoviesRoute(e) {
    e.preventDefault();
    if (searchableTextOnSavedMovies === '') {
      return;
    } else {
      setIsLoading(true);
      if (JSON.parse(localStorage.getItem('savedMovies')) === null) {
        await handleUserDataCheck();
      }
      const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
      const searchedSavedFilms = handlerSavedMoviesFilter(savedMovies);
      if (searchedSavedFilms.length === 0) {
        setNotFoundError('Ничего не найдено');
      } else {
        setNotFoundError('');
      }
      setSavedMovies(searchedSavedFilms);
      setIsLoading(false);
    }
  }

  function handleSearchOnDuration() {
    setCheckedCheckbox(!checkedCheckbox);
    localStorage.setItem('checkedCheckbox', !checkedCheckbox);
  }

  function handleSearchOnDurationSavedMovies() {
    setCheckedCheckboxSavedMovies(!checkedCheckboxSavedMovies);
  }

  useEffect(() => {
    const beautyFilmMovies = JSON.parse(localStorage.getItem('beautyFilmMovies'));
    if (beautyFilmMovies !== null) {
      const filterResult = handlerFilter(beautyFilmMovies);
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
    if (location.pathname === '/movies') {
      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')) || []);
      setSearchableTextOnSavedMovies('');
      setCheckedCheckboxSavedMovies(false);
    }
  }, [location]);

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
                isLoggedIn={isLoggedIn}
                onMobileMenu={handleMobileMenuClick}
                authorizationEmail={currentUser.email}
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
                <Navigate to='/movies' />
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
              isLoggedIn ? (
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    onMobileMenu={handleMobileMenuClick}
                    authorizationEmail={currentUser.email}
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
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            exact
            strict
            path='/saved-movies'
            element={
              isLoggedIn ? (
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies
                    onMobileMenu={handleMobileMenuClick}
                    authorizationEmail={currentUser.email}
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
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            exact
            strict
            path='/profile'
            element={
              isLoggedIn ? (
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onMobileMenu={handleMobileMenuClick}
                    isSignOut={handleSignOut}
                    isLoggedIn={isLoggedIn}
                    editUser={handleUpdateUser}
                  />
                </ProtectedRoute>
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeAllPopups}
          authorizationEmail={currentUser.email}
        />
        <InfoTooltip
          isOpen={infoToolTipMessage}
          onClose={closeAllPopups}
          isStatusGood={allGoodStatus}
          messageToUser={messageToUser}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
