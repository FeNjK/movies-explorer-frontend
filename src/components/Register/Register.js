import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

function Register({ onRegister }) {

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(registerData);
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
          /* noValidate */
          /* autoComplete='off' */
        >
          <span className='register__placeholder'>Имя</span>
          <input
            type='name'
            name='name'
            className='register__input'
            id='name'
            minLength='2'
            maxLength='30'
            required
            value={registerData.name}
            onChange={handleChange}
            autoComplete='off'
          />
          <span className='register__placeholder'>E-mail</span>
          <input
            type='email'
            name='email'
            className='register__input'
            id='email'
            minLength='6'
            maxLength='40'
            required
            value={registerData.email}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* Заготовка под валидацию формы по аналогии с попапами*/}
          {/* <span
            className='popup__validation-message popup__validation-message_position_first'
            id='email-error'
          /> */}
          <span className='register__placeholder'>Пароль</span>
          <input
            type='password'
            name='password'
            className='register__input'
            id='password'
            minLength='6'
            maxLength='40'
            required
            value={registerData.password}
            onChange={handleChange}
            autoComplete='off'
          />
          {/* Заготовка под валидацию формы по аналогии с попапами*/}
          {/* <span
            className='popup__validation-message popup__validation-message_position_second'
            id='password-error'
          /> */}
          <button type='submit' className='register__button app__buttons'>
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
