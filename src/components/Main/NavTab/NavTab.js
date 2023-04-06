import './NavTab.css';
import { Link } from 'react-scroll';

function NavTab() {
  return (
    <nav className='navtab'>
      <ul className='navtab__link-conteiner'>
        <li className='navtab__link app__buttons'>
          <Link
            className='navtab__link-address'
            to='promo'
            smooth={true}
            duration={500}
          >
            О проекте
          </Link>
        </li>
        <li className='navtab__link app__buttons'>
          <Link
            className='navtab__link-address'
            to='techs'
            smooth={true}
            duration={500}
          >
            Технологии
          </Link>
        </li>
        <li className='navtab__link app__buttons'>
        <Link
            className='navtab__link-address'
            to='about-me'
            smooth={true}
            duration={500}
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
