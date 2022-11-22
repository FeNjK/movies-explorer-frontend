import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(loginData);
  }

  useEffect(() => {
    document.title = 'Авторизация пользователя';
  }, []);

  return (
    <div className='login'>
      <div className='login__conteiner'>
        <Logo />
        <h3 className='login__title'>Рады видеть!</h3>
        <form
          className='login__form'
          onSubmit={handleSubmit}
          /* noValidate */
          /* autoComplete='off' */
        >
          <span className='login__placeholder'>E-mail</span>
          <input
            type='email'
            name='email'
            className='login__input'
            id='email'
            minLength='6'
            maxLength='40'
            required
            value={loginData.email || ''}
            onChange={handleChange}
          />
          {/* Заготовка под валидацию формы по аналогии с попапами*/}
          {/* <span
          className='popup__validation-message popup__validation-message_position_first'
          id='email-error'
        /> */}
          <span className='login__placeholder'>Пароль</span>
          <input
            type='password'
            name='password'
            className='login__input'
            id='password'
            minLength='6'
            maxLength='40'
            required
            value={loginData.password || ''}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* Заготовка под валидацию формы по аналогии с попапами*/}
          {/* <span
          className='popup__validation-message popup__validation-message_position_second'
          id='password-error'
        /> */}
          <button type='submit' className='login__button app__buttons'>
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
