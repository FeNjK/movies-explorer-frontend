import './Profile.css'
import Header from '../Header/Header';

function Profile({ isLoggedIn, isSignOut, onMobileMenu }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} onMobileMenu={onMobileMenu}/>
      <main className='profile'>
        <div className='profile__conteiner'>
          <h3 className='profile__title'>Привет, Виталий!</h3>
            <form
              className='profile__form'
              /* onSubmit={handleSubmit} */
              /* noValidate */
              /* autoComplete='off' */
            >
              <span className='profile__placeholder profile__placeholder-position_first'>Имя</span>
              <input
                type='name'
                name='name'
                className='profile__input'
                id='name'
                minLength='2'
                maxLength='30'
                required
                value='Виталий'/* {profileData.name} */
                /* onChange={handleChange} */
                autoComplete='off'
              />
              <span className='profile__placeholder profile__placeholder-position_second'>E-mail</span>
              <input
                type='email'
                name='email'
                className='profile__input'
                id='email'
                minLength='6'
                maxLength='40'
                required
                value='pochta@yandex.ru'/* {profilerData.email} */
                /* onChange={handleChange} */
                autoComplete='off'
              />
              <div className='profile__buttons'>
                <button className='profile__edit-button app__links'>Редактировать</button>
                <button className='profile__sign-out-button app__buttons' onClick={isSignOut}>Выйти из аккаунта</button>
              </div>
            </form>
        </div>
      </main>
    </>
  )
}

export default Profile;