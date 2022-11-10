import './Logo.css';
import { Link, useLocation } from 'react-router-dom';

function Logo() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && (
      <Link to='/' className='logo logo_top app__buttons' /> 
      )}
      {location.pathname === '/movies' && (
      <Link to='/' className='logo logo_top app__buttons' /> 
      )}
      {location.pathname === '/saved-movies' && (
      <Link to='/' className='logo logo_top app__buttons' /> 
      )}
      {location.pathname === '/profile' && (
      <Link to='/' className='logo logo_top app__buttons' /> 
      )}
      {location.pathname === '/sign-up' && (
      <Link to='/' className='logo logo_center app__buttons' /> 
      )}
      {location.pathname === '/sign-in' && (
      <Link to='/' className='logo logo_center app__buttons' /> 
      )}
    </>
  )
}

export default Logo;