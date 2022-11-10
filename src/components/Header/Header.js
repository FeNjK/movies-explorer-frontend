/* import { useState } from 'react'; */
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header({ loggedIn, onMobileMenu }) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className='header'>
      <Logo />
      <nav className='header__nav-elemements'>
          {location.pathname === '/' && (
            <ul className='header__nav-list'>
              <li className='header__nav-list-item'>
                <Link
                  to='/sign-up'
                  className='header__nav-link app__links'
                >
                  Регистрация
                </Link>
              </li>
              <li className='header__nav-list-item'>
                <Link
                  to='/sign-in'
                  className='header__nav-list-item header__nav-button app__buttons'
                >
                  <p className='header__nav-list-item header__nav-button-text'>
                    Войти
                  </p>
                </Link>
              </li>
            </ul>
          )}
          {location.pathname === '/movies' && (
            <Navigation onMobileMenu={onMobileMenu} />
          )}
          {location.pathname === '/saved-movies' && (
            <Navigation onMobileMenu={onMobileMenu}/>
          )}
          {location.pathname === '/profile' && (
            <Navigation onMobileMenu={onMobileMenu}/>
          )}
        </nav>
      
      
      
      
      
      
      
      
      
      
      
      
      
      {/* {isLoggedIn ? (
        <nav className='header__nav-elemements'>
          {location.pathname === '/' && (
            <>
              <Link
                to='/sign-up'
                className='header__nav-elemement header__nav-elemement_link app__links'
              >
                Регистрация
              </Link>
              <Link
                to='/sign-in'
                className='header__nav-elemement header__nav-elemement_button app__buttons'
              >
                <p className='header__nav-elemement header__nav-elemement_button-text'>
                  Войти
                </p>
              </Link>
            </>
          )}
        </nav>
      ) : (
       <nav className='header__nav-elemements'>
          {location.pathname === '/movies' && (
            <>
              <Link
                to='/movies'
                className='header__nav-elemement header__nav-elemement_link app__links'
              >
                Фильмы
              </Link>
              <Link
                to='/saved-movies'
                className='header__nav-elemement header__nav-elemement_link app__links'
              >
                <p className='header__nav-elemement_button-text'>Войти</p>
              </Link>
            </>
          )}
        </nav>
      )} */}
    </header>
  );
}

export default Header;
