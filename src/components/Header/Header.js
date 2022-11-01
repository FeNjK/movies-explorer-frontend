import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип' />
      {location.pathname === '/sign-in' && (
        <Link to='/sign-up' className='header__link'>
          Регистрация
        </Link>
      )}
      {location.pathname === '/sign-up' && (
        <Link to='/sign-in' className='header__button'>
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
