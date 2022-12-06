const VALID_NAME = '[A-Za-zА-Яа-яЁё]+$';
const VALID_PASSWORD = '^[a-zA-Z0-9]{6,40}$';
// const VALID_EMAIL = '([A-Za-z0-9.-])+\@([a-zA-Z0-9-]{1,63})(\.([A-Za-z]{2,6}))+';
// eslint-disable-next-line no-useless-escape
const VALID_EMAIL = '[a-zA-Z0-9!#$%&*+/=?^_{|}~-]+(?:\.[a-zA-Z0-9!#$%&*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';

const INDICATOR_OF_SHORT_MOVIE = 40;

const LARGE_PAGE_SIZE = 1178;
const MEDIUM_PAGE_SIZE = 650;

const QUANTITY_MOVIES_LARGE = 12;
const QUANTITY_MOVIES_MEDIUM = 8;
const QUANTITY_MOVIES_SMALL = 5;
const BIG_STEP = 3;
const SMALL_STEP = 2;

export {
  VALID_NAME,
  VALID_PASSWORD,
  VALID_EMAIL,
  LARGE_PAGE_SIZE,
  MEDIUM_PAGE_SIZE,
  INDICATOR_OF_SHORT_MOVIE,
  QUANTITY_MOVIES_LARGE,
  QUANTITY_MOVIES_MEDIUM,
  QUANTITY_MOVIES_SMALL,
  BIG_STEP,
  SMALL_STEP,
};
