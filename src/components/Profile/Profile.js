import './Profile.css'
import Header from '../Header/Header';

function Profile({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <div>Тут данные профиля</div>
    </>
  )
}

export default Profile;