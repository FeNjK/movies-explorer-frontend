import './SearchForm.css';
import SearchTumbler from '../SearchTumbler/SearchTumbler';
/* import useFormWithValidation from '../../hooks/useFormWithValidation'; */

function SearchForm({
  handlerSubmit,
  searchableText,
  handleChange,
  isLoading,
  unchecked,
  onCheckbox,
}) {

  return (
    <section className='search'>
      <form
        className='search__form'
        name='search__form'
        onSubmit={handlerSubmit}
        /* noValidate */
      >
        <input
          className='search__input'
          type='text'
          name='searchableText'
          placeholder='Фильм'
          value={searchableText}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <button
          type='submit'
          className='search__button app__buttons'
          disabled={isLoading}
        >
          Найти
        </button>
      </form>
      <SearchTumbler
        unchecked={unchecked}
        onCheckbox={onCheckbox}
        disabled={isLoading}
      />
    </section>
  );
}
export default SearchForm;
