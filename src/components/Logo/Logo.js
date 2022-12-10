import './Logo.css';
import { Link, useLocation } from 'react-router-dom';

function Logo() {
  const location = useLocation();

  return (
    <>
      {(location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile') && (
        <Link to='/' className='logo logo_top app__buttons' />
      )}
      {(location.pathname === '/signup' || location.pathname === '/signin') && (
        <Link to='/' className='logo logo_center app__buttons' />
      )}
    </>
  );
}

export default Logo;
