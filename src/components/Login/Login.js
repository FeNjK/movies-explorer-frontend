import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';
import { VALID_EMAIL, VALID_PASSWORD } from '../../utils/constants';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const { email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      return false;
    } else {
      onLogin(values, resetForm);
    }
  }

  useEffect(() => {
    document.title = 'Авторизация пользователя';
  }, []);

  return (
    <div className='login'>
      <div className='login__container'>
        <Logo />
        <h3 className='login__title'>Рады видеть!</h3>
        <form
          className='login__form'
          onSubmit={handleSubmit}
          noValidate
          /* autoComplete='off' */
        >
          <span className='login__placeholder'>E-mail</span>
          <input
            type='email'
            name='email'
            className='login__input'
            minLength='6'
            maxLength='40'
            required
            pattern={VALID_EMAIL}
            value={email || ''}
            onChange={handleChange}
          />
          <span className='login__input-error login__input-error_first'>
            {errors.email || ''}
          </span>
          <span className='login__placeholder'>Пароль</span>
          <input
            type='password'
            name='password'
            className='login__input'
            minLength='6'
            maxLength='40'
            required
            pattern={VALID_PASSWORD}
            value={password || ''}
            onChange={handleChange}
            autoComplete='off'
          />
          <span className='login__input-error login__input-error_second'>
            {errors.password || ''}
          </span>
          <button
            type='submit'
            className={`login__button ${
              !isValid ? 'login__button_disabled' : 'app__buttons'
            }`}
            disabled={!isValid ? true : false}
          >
            Войти
          </button>
        </form>
        <span className='login__help'>
          Ещё не зарегистрированы?
          <Link className='login__link app__links' to='/signup'>
            Регистрация
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
