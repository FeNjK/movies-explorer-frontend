import './Navigation.css';
import accountImg from '../../images/Значек аккаунта.svg';
import { NavLink } from 'react-router-dom';

function Navigation() {

  return (
    <nav className='navigation'>
      <ul className='navigation__list'>
        <li className='navigation__list-item'>
          <NavLink
            to='/movies'
            className='navigation__link app__links'
            /* activeStyle={{
              font-weight: 500,
            }} */
          >
            Фильмы
          </NavLink>
        </li>
        <li className='navigation__list-item'>
          <NavLink
            to='/saved-movies'
            className='navigation__link app__links'
          >
            Сохранённые фильмы
          </NavLink>
        </li>
        <li className='navigation__list-item'>
          <NavLink
            to='/profile'
            className='navigation__profile-link app__links'
          >
            Аккаунт
          </NavLink>
          <div className='navigation__profile-image-blok'>
            <img
              className='navigation__profile-image'
              src={accountImg}
              alt='Значoк аккаунта'
            />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
