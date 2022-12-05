import './Profile.css';
import Header from '../Header/Header';
import { useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { VALID_EMAIL } from '../../utils/constants';

function Profile({
  isLoggedIn,
  isSignOut,
  editUser,
  onMobileMenu,
  authorizationEmail,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const { email = currentUser.email, name = currentUser.name } = values;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return false;
    } else {
      editUser(values);
    }
  }

  useEffect(() => {
    document.title = 'Ваш профиль';
  }, []);

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
            noValidate
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
              required
              value={name || ''}
              onChange={handleChange}
              autoComplete='off'
            />
            <span className='profile__input-error profile__input-error_first'>
              {errors.name || ''}
            </span>
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
              pattern={VALID_EMAIL}
              required
              value={email || ''}
              onChange={handleChange}
              autoComplete='off'
            />
            <span className='profile__input-error profile__input-error_second'>
              {errors.email || ''}
            </span>
            <div className='profile__buttons'>
              <button
                className={`profile__edit-button ${
                  isValid ? 'app__links' : ''
                }`}
                disabled={!isValid ? true : false}
              >
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
