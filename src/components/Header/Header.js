/* import { useState } from 'react'; */
import './Header.css';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';

function Header({loggedIn, isBigHeader}) {
  const location = useLocation();
  /* const [isLoggedIn, setIsLoggedIn] = useState(false); */

  return (
    <header className={`${isBigHeader || loggedIn ? 'header' : ''}`}>
      <Logo/>
      {loggedIn ? (
        <nav className='header__nav-elemements'>
          {location.pathname === '/' && (
            <Link
              to='/sign-up'
              className='header__nav-elemement header__nav-elemement_link app__links'
            >
              Регистрация
            </Link>
          )}
          {location.pathname === '/' && (
            <Link
              to='/sign-in'
              className='header__nav-elemement header__nav-elemement_button app__buttons'
            >
              <p className='header__nav-elemement header__nav-elemement_button-text'>Войти</p>
            </Link>
          )}
        </nav>
      ) : (
        <nav className='header__nav-elemements'>
          {location.pathname === '/' && (
            <Link
              to='/sign-up'
              className='header__nav-elemement header__nav-elemement_link app__links'
            >
              Регистрация
            </Link>
          )}
          {location.pathname === '/' && (
            <Link
              to='/sign-in'
              className='header__nav-elemement header__nav-elemement_button app__buttons'
            >
              <p className='header__nav-elemement_button-text'>Войти</p>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
