/* import { useState } from 'react'; */
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

function Header({isLoggedIn, isStartPage}) {
  const location = useLocation();
  /* const [isLoggedIn, setIsLoggedIn] = useState(false); */

  return (
    <header className={`${isStartPage ? 'header' : ''}`}>
      <Link to='/' className='header__logo header__logo_top app__buttons' />
      {isLoggedIn ? (
        <div className='header__nav-elemements'>
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
        </div>
      ) : (
        <div className='header__nav-elemements'>
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
        </div>
      )}
    </header>
  );
}

export default Header;
