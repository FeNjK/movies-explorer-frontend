import luckImage from '../../images/luck.jpg';
import unLuckImage from '../../images/failure.jpg';
import { useLocation } from 'react-router-dom';

function InfoTooltip({ isOpen, onClose, isRegistrationGood }) {
  const location = useLocation();

  return (
    <div
      className={`app__popup app__popup-animation ${
        isOpen && 'app__popup_activ'
      }`}
    >
      <div className='app__popup-center-content'>
        <button
          className={`app__popup-close-button app__popup-close-button_up`}
          type='button'
          title='Закрыть окно'
          onClick={onClose}
        />
        <img
          className='app__popup-registration-result'
          alt='Индикатор состояния регистрации'
          src={isRegistrationGood ? luckImage : unLuckImage}
        />
        <h3 className='app__popup-registration-message'>
          {location.pathname === '/signin' &&
            (isRegistrationGood
              ? 'Регистрация прошла успешно!'
              : 'Что-то пошло не так! Попробуйте ещё раз.')}
          {location.pathname === '/movies' &&
            (isRegistrationGood
              ? 'Вы успешно авторизованы!'
              : 'Что-то пошло не так! Попробуйте ещё раз.')}
          {location.pathname === '/profile' &&
            (isRegistrationGood
              ? 'Ваши данные успешно обновлены!'
              : 'Что-то пошло не так! Попробуйте ещё раз.')}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
