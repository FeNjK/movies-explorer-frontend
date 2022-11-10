import './MobileMenu.css';

function MobileMenu({ isOpen }) {

  return (
    <div className={`app__popup app__popup-animation ${isOpen && 'app__popup_activ'}`}>
      <div className='app__popup-content'></div>
    </div>
  )
}

export default MobileMenu;