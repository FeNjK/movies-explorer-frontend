import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className='not-found'>
      <h3 className='not-found__title'>404</h3>
      <p className='not-found__description'>Страница не найдена</p>
      <Link className='not-found__link app__links' to='/'>Назад</Link>
    </div>
  )
}

export default PageNotFound;