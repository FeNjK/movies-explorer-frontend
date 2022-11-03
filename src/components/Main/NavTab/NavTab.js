import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab() {

  return (
    <nav className='navtab'>
      <ul className='navtab__link-conteiner'>
        <li className='navtab__link app__buttons'>
          <Link
            to='/'
            className='navtab__link-address'
            href='#promo'
          >
            О проекте
          </Link>
        </li>
        <li className='navtab__link app__buttons'>
          <Link
            to='/'
            className='navtab__link-address'
            href='#techs'
          >
            Технологии
          </Link>
        </li>
        <li className='navtab__link app__buttons'>
          <Link
            to='/'
            className='navtab__link-address'
            href='#about-me'
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
