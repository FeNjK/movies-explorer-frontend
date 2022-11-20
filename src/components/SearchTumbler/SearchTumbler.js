import './SearchTumbler.css';

function SearchTumbler({ checked, onCheckbox }) {
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
          checked={checked}
          onChange={onCheckbox}
        />
        Короткометражки
      </label>
    </div>
  );
}
export default SearchTumbler;
