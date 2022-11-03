import { useState } from "react";
import './Header.css';
import {
  Link,
  useLocation,
  /* useNavigate */
} from 'react-router-dom';

function Header(/* loggedIn, email */) {
  const location = useLocation();
  /* const [loggedIn, setloggedIn] = useState(false); */
  /* const navigate = useNavigate();

  function goToMain() {
    navigate('/');
  }; */

  return (

    <header to='/' className='header'>
      <Link
        to='/'
        className='header__logo header__logo_unprotected-page app__buttons'
      />
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

        {/* Эксперименты для наглядности */}
        {location.pathname === '/sign-in' && (
          <Link
            to='/sign-in'
            className='header__nav-elemement header__nav-elemement_button app__buttons'
          >
            <p>Логинься тут</p>
          </Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link
            to='/sign-in'
            className='header__nav-elemement header__nav-elemement_button app__buttons'
          >
            <p>Давай регистрируйся</p>
          </Link>
        )}
      </div>






  {/* return (() => {
    if (loggedIn) {
      'такой-то хедер с таким-то наполнением';
    } else {
      'другой хедер';
    }
  }) */}

    </header>
  );
}



export default Header;




