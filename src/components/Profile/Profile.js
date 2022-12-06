import './Profile.css';
import Header from '../Header/Header';
import { useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { VALID_NAME, VALID_EMAIL } from '../../utils/constants';

function Profile({
  isLoggedIn,
  isSignOut,
  editUser,
  onMobileMenu,
  authorizationEmail,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues
  } = useFormWithValidation({});

  const unchangedData =
    values.name === currentUser.name &&
    values.email === currentUser.email;

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || unchangedData) {
      return false;
    } else {
      editUser({ ...values });
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
          >
            <span className='profile__placeholder profile__placeholder-position_first'>
              Имя
            </span>
            <input
              type='text'
              name='name'
              className='profile__input'
              minLength='2'
              maxLength='30'
              required
              pattern={VALID_NAME}
              value={values.name || ''}
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
              type='email'
              name='email'
              className='profile__input'
              minLength='6'
              maxLength='40'
              pattern={VALID_EMAIL}
              required
              value={values.email || ''}
              onChange={handleChange}
              autoComplete='off'
            />
            <span className='profile__input-error profile__input-error_second'>
              {errors.email || ''}
            </span>
            <div className='profile__buttons'>
              <button
                className={`profile__edit-button ${
                  isValid && !unchangedData ? 'app__links' : ''
                }`}
                disabled={!isValid || unchangedData ? true : false}
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
