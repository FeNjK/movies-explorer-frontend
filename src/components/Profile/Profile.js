import './Profile.css';
import Header from '../Header/Header';
import { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { VALID_NAME } from '../../utils/constants'

function Profile({ isLoggedIn, isSignOut, editUser, onMobileMenu, authorizationEmail }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = 'Ваш профиль';
  }, []);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editUser({ name, email })
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onMobileMenu={onMobileMenu}
        authorizationEmail={authorizationEmail}
      />
      <main className='profile'>
        <div className='profile__conteiner'>
          <h1 className='profile__title'>Привет, {`${currentUser.name}`}!</h1>
          <form
            className='profile__form'
            onSubmit={handleSubmit}
            /* noValidate */
            /* autoComplete='off' */
          >
            <span className='profile__placeholder profile__placeholder-position_first'>
              Имя
            </span>
            <input
              type='text'
              name='name'
              className='profile__input'
              id='name'
              minLength='2'
              maxLength='30'
              pattern='VALID_NAME'
              required
              value={name}
              onChange={handleChangeName}
              autoComplete='off'
            />
            <span className='profile__placeholder profile__placeholder-position_second'>
              E-mail
            </span>
            <input
              type='text'
              name='email'
              className='profile__input'
              id='email'
              minLength='6'
              maxLength='40'
              pattern={VALID_NAME}

              required
              value= {email}
              onChange={handleChangeEmail}
              autoComplete='off'
            />
            <div className='profile__buttons'>
              <button className='profile__edit-button app__links'>
                Редактировать
              </button>
              <button
                className='profile__sign-out-button app__buttons'
                onClick={isSignOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Profile;
