import './Logo.css';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to='/' className='logo logo_top app__buttons' />
  )
}

export default Logo;