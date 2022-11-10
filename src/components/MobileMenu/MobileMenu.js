import accountImg from '../../images/Значек аккаунта.svg';
import { NavLink } from 'react-router-dom';

function MobileMenu({ isOpen, onClose }) {
  let activeMoviesLink = 'app__popup-navigation-link app__popup-navigation-link_active app__links';
  let activeProfileLink = 'app__popup-navigation-profile-link app__popup-navigation-link_active app__links';

  return (
    <div 
      className={
        `app__popup app__popup-animation ${isOpen && 'app__popup_activ'}`
        }
      >
      <div className='app__popup-content'>
        <button
          className='app__popup-close-button app__popup-close-button_window-мobile-мenu'
          type='button'
          title='Закрыть окно'
          onClick={onClose}
        />
      <nav className='app__popup-navigation'>
        <ul className='app__popup-navigation-list'>
          <li className='app__popup-navigation-list-item'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? activeMoviesLink : 'app__popup-navigation-link app__links'
              }
            end>
              Главная
            </NavLink>
          </li>
          <li className='app__popup-navigation-list-item'>
            <NavLink
              to='/movies'
              className={({ isActive }) =>
                isActive ? activeMoviesLink : 'app__popup-navigation-link app__links'
              }
            end>
              Фильмы
            </NavLink>
          </li>
          <li className='app__popup-navigation-list-item'>
            <NavLink
              to='/saved-movies'
              className={({ isActive }) =>
                isActive ? activeMoviesLink : 'app__popup-navigation-link app__links'
              }
            end>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className='app__popup-navigation-profile'>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                isActive ? activeProfileLink : 'app__popup-navigation-profile-link app__links'
              }
            end>
              Аккаунт
            </NavLink>
            <div className='app__popup-navigation-profile-image-blok'>
              <img
                className='app__popup-navigation-profile-image'
                src={accountImg}
                alt='Значoк аккаунта'
              />
            </div>
          </div>
      </nav>
      </div>
    </div>
  )
}

export default MobileMenu;