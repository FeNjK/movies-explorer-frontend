import './SearchForm.css';
import SearchTumbler from '../SearchTumbler/SearchTumbler';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <input className='search__input' placeholder='Фильм' required />
        <button type='submit' className='search__button app__buttons'>Найти</button>
      </form>
      <SearchTumbler />
    </section>
  );
}
export default SearchForm;
