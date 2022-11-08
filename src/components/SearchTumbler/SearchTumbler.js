import './SearchTumbler.css';

function SearchTumbler() {
  return (
    <div className='search-tumbler'>
      <label
        className='search-tumbler__toggle-checkbox'
        htmlFor='switch'>
        <input
          type='checkbox'
          role='switch'
          id='switch'
          className='search-tumbler__checkbox-track'
        />
        Короткометражки
      </label>
    </div>
  );
}
export default SearchTumbler;
