import './NavTab.css';
import { createRef } from 'react';
import { Link } from 'react-router-dom';

function NavTab() {
  let goTo = createRef();
  /* console.log(goTo); */

  function handleClick() {
    goTo.current.focus();
  }

  return (
    <nav className='navtab'>
      <ul className='navtab__link-container'>
        <li className='navtab__link app__buttons'>
          <Link
            to='/'
            className='navtab__link-address'
            /* href='#promo' */
            onClick={handleClick}
          >
            О проекте
          </Link>
        </li>
        <li className='navtab__link app__buttons'>
          <Link
            to='/'
            className='navtab__link-address'
            /* href='#techs' */
            onClick={handleClick}
          >
            Технологии
          </Link>
        </li>
        <li className='navtab__link app__buttons'>
          <Link
            to='/'
            className='navtab__link-address'
            /* href='#about-me' */
            onClick={handleClick}
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
