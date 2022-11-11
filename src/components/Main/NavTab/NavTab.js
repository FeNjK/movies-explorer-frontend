import './NavTab.css';
import { createRef } from 'react';
import { Link } from 'react-router-dom';

function NavTab() {
  // наверное зря я это сделал,
  // да ещё и с перезагрузкой страницы.
  // надо будет попробовать плавный скролл
  // или колбек... И прокинуть через родительский компонент
  let goTo = createRef();
  /* console.log(goTo); */

  function handleClick() {
    goTo.current.focus();
  }

  return (
    <nav className='navtab'>
      <ul className='navtab__link-conteiner'>
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
