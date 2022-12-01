import './SearchForm.css';
import SearchTumbler from '../SearchTumbler/SearchTumbler';
/* import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useEffect } from 'react'; */

function SearchForm({
  handlerSubmit,
  searchableText,
  handleChange,
  isLoading,
  checkedCheckbox,
  onChangeCheckbox,
}) {
  /* const { values, errors, isValid, setValues } = useFormWithValidation();

  function handlSubmit(e) {
    e.preventDefault();
    handlerSubmit(values.searchableText);
    if (values.searchableText === '') {
      return !isValid;
    } else {
      return isValid;
    }
  }

  useEffect(() => {
    setValues(searchableText);
  }, [searchableText, setValues]); */

  return (
    <section className='search'>
      <form
        className='search__form'
        name='search__form'
        onSubmit={handlerSubmit}
        noValidate
      >
        <input
          className='search__input'
          type='text'
          name='searchableText'
          placeholder='Фильм'
          minLength='1'
          maxLength='64'
          value={/* values. */searchableText || ''}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        {/* <span
          className='search__input-error search__input-error_first'>
            {errors.email}
        </span> */}
        <button
          type='submit'
          /* className={`search__button ${
            !isValid ? 'search__button_disabled' : 'app__buttons'
          }`} */
          className='search__button app__buttons'
          /* disabled={!isValid ? true : false} */
          disabled={isLoading}
        >
          Найти
        </button>
      </form>
      <SearchTumbler
        checkedCheckbox={checkedCheckbox}
        onChangeCheckbox={onChangeCheckbox}
        disabled={isLoading}
      />
    </section>
  );
}
export default SearchForm;
