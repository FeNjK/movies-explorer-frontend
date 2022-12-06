import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';
import { VALID_NAME, VALID_EMAIL, VALID_PASSWORD } from '../../utils/constants';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const { name, email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return false;
    } else {
      onRegister(values, resetForm);
    }
  }

  useEffect(() => {
    document.title = 'Регистрация нового пользователя';
  }, []);

  return (
    <div className='register'>
      <div className='register__conteiner'>
        <Logo />
        <h3 className='register__title'>Добро пожаловать!</h3>
        <form
          className='register__form'
          onSubmit={handleSubmit}
          noValidate
          /* autoComplete='off' */
        >
          <span className='register__placeholder'>Имя</span>
          <input
            type='name'
            name='name'
            className='register__input'
            minLength='2'
            maxLength='30'
            required
            pattern={VALID_NAME}
            value={name || ''}
            onChange={handleChange}
          />
          <span className='register__input-error register__input-error_first'>
            {errors.name}
          </span>
          <span className='register__placeholder'>E-mail</span>
          <input
            type='email'
            name='email'
            className='register__input'
            minLength='6'
            maxLength='40'
            required
            pattern={VALID_EMAIL}
            value={email || ''}
            onChange={handleChange}
          />
          <span className='register__input-error register__input-error_second'>
            {errors.email || ''}
          </span>
          <span className='register__placeholder'>Пароль</span>
          <input
            type='password'
            name='password'
            className='register__input'
            minLength='6'
            maxLength='40'
            required
            pattern={VALID_PASSWORD}
            value={password || ''}
            onChange={handleChange}
            autoComplete='off'
          />
          <span className='register__input-error register__input-error_third'>
            {errors.password || ''}
          </span>
          <button
            type='submit'
            className={`register__button ${
              !isValid ? 'register__button_disabled' : 'app__buttons'
            }`}
            disabled={!isValid ? true : false}
          >
            Зарегистрироваться
          </button>
        </form>
        <span className='register__help'>
          Уже зарегистрированы?
          <Link className='register__link app__links' to='/signin'>
            Войти
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
