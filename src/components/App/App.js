// Рыба
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import initialCards from '../../utils/initialCards';
import './App.css';

function App() {
  // сделать асинхронные GET- и POST-запросы к API на 4 этапе
  // написать все запросы к нашему и стороннему API на 4 этапе
  // защитить роуты /saved-movies, /profile и /movies авторизацией

  // передрать с макета или создать свои карточки с фильмами для теста

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState(initialCards); // временное решение

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route exact strict path='/' element={
            <Main loggedIn={isLoggedIn}/>
          }>
          </Route>
          <Route exact strict path='/sign-in'>
            {/* <Login /> */}
          </Route>
          <Route exact strict path='/sign-up'>
            {/* <Register /> */}
          </Route>
          <Route exact strict path='/movies'>
            {/* Домыслы */}
            {/* <Movies movies={movies} isLoggedIn={isLoggedIn}/> */}
          </Route>
          <Route exact strict path='/saved-movies'>
            {/* Домыслы */}
            {/* <SavedMovies movies={movies} isLoggedIn={isLoggedIn}/> */}
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App; 
