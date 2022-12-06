import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
/* import { useEffect, useState } from 'react'; */

function Header({ isLoggedIn, onMobileMenu, authorizationEmail }) {
  const location = useLocation();
  /* const [requestAddress, setRequestAddress] = useState(JSON.parse(localStorage.getItem('lastLocation')) || '')
  const lastLocation = location.pathname; */

  return (
    <header className='header'>
      <Logo />
      <nav className='header__nav-elemements'>
        {!isLoggedIn && location.pathname === '/' && (
          <ul className='header__nav-list'>
            <li className='header__nav-list-item'>
              <Link to='/signup' className='header__nav-link app__links'>
                Регистрация
              </Link>
            </li>
            <li className='header__nav-list-item'>
              <Link
                to='/signin'
                className='header__nav-list-item header__nav-button app__buttons'
              >
                <p className='header__nav-list-item header__nav-button-text'>
                  Войти
                </p>
              </Link>
            </li>
          </ul>
        )}
        {isLoggedIn &&
          (location.pathname === '/' ||
            location.pathname === '/movies' ||
            location.pathname === '/saved-movies' ||
            location.pathname === '/profile') && (
            <Navigation
              onMobileMenu={onMobileMenu}
              authorizationEmail={authorizationEmail}
            />
          )}
      </nav>
    </header>
  );
}

export default Header;
