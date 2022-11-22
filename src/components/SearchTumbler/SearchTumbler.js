import './SearchTumbler.css';

function SearchTumbler({ checkedCheckbox, onChangeCheckbox, disabled }) {
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
          checked={checkedCheckbox}
          onChange={onChangeCheckbox}
          disabled={disabled}
        />
        Короткометражки
      </label>
    </div>
  );
}
export default SearchTumbler;
