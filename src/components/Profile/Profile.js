import './Profile.css';
import Header from '../Header/Header';
import { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ isLoggedIn, isSignOut, onMobileMenu, authorizationEmail }) {
  const currentUser = useContext(CurrentUserContext);


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
            /* onSubmit={handleSubmit} */
            /* noValidate */
            /* autoComplete='off' */
          >
            <span className='profile__placeholder profile__placeholder-position_first'>
              Имя
            </span>
            <input
              type='name'
              name='name'
              className='profile__input'
              id='name'
              minLength='2'
              maxLength='30'
              required
              value={currentUser.name}
              /* onChange={handleChange} */
              autoComplete='off'
            />
            <span className='profile__placeholder profile__placeholder-position_second'>
              E-mail
            </span>
            <input
              type='email'
              name='email'
              className='profile__input'
              id='email'
              minLength='6'
              maxLength='40'
              required
              value= {currentUser.email}
              /* onChange={handleChange} */
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
