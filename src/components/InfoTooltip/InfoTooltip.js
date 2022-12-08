import luckImage from '../../images/luck.jpg';
import unLuckImage from '../../images/failure.jpg';

function InfoTooltip({ isOpen, onClose, isStatusGood, messageToUser }) {
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
          src={isStatusGood ? luckImage : unLuckImage}
        />
        <h3 className='app__popup-registration-message'>{messageToUser}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
