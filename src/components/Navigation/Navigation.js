import './Navigation.css';
import accountImg from '../../images/Значек аккаунта.svg';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navigation({ onMobileMenu }) {
  const [width, setWidth] = useState(window.innerWidth);

  const breakpoint = 1023;
  
  useEffect(() => {
   const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  let activeMoviesLink = 'navigation__link navigation__link_active app__links';
  let activeProfileLink = 'navigation__profile-link navigation__link_active app__links';

  if (width > breakpoint) {
    return (
      <nav className='navigation'>
        <ul className='navigation__list'>
          <li className='navigation__list-item'>
            <NavLink
              to='/movies'
              className={({ isActive }) =>
                isActive ? activeMoviesLink : 'navigation__link app__links'
              }
            end>
              Фильмы
            </NavLink>
          </li>
          <li className='navigation__list-item'>
            <NavLink
              to='/saved-movies'
              className={({ isActive }) =>
                isActive ? activeMoviesLink : 'navigation__link app__links'
              }
            end>
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className='navigation__list-item'>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive ? activeProfileLink : 'navigation__profile-link app__links'
              }
            end>
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
  } else {
    return (
      <button
        className='navigation__mobile-button app__buttons'
        type='button'
        onClick={onMobileMenu}
        aria-label='Кнопка меню'
      />
    );
  }
    
}

export default Navigation;
