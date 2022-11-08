import './Movies.css'
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer';
import { useState } from 'react';

function Movies({ loggedIn, movies}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='movies'>
        <SearchForm />
        <MoviesCardList movies={movies} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;