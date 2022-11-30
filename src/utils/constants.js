const VALID_URL =/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/mi;
const VALID_NAME = /[A-Za-zА-Яа-яЁё\\s-]+/;
const VALID_PASSWORD = /^(?=\P{Ll}*\p{Ll})(?=\P{Lu}*\p{Lu})(?=\P{N}*\p{N})(?=[\p{L}\p{N}]*[^\p{L}\p{N}])[\s\S]{8,}$/;
// Вышеуказанное регулярное выражение гарантирует, что в пароле длиной более 8 символов присутствует по крайней мере один строчный, верхний регистр, число и символ
const LARGE_PAGE_SIZE = 1178;
const MEDIUM_PAGE_SIZE = 650;

const INDICATOR_OF_SHORT_MOVIE = 40;

const QUANTITY_MOVIES_LARGE = 12;
const QUANTITY_MOVIES_MEDIUM = 8;
const QUANTITY_MOVIES_SMALL = 5;
const BIG_STEP = 3;
const SMALL_STEP = 2;



export {
  VALID_URL,
  VALID_NAME,
  VALID_PASSWORD,
  LARGE_PAGE_SIZE,
  MEDIUM_PAGE_SIZE,
  INDICATOR_OF_SHORT_MOVIE,
  QUANTITY_MOVIES_LARGE,
  QUANTITY_MOVIES_MEDIUM,
  QUANTITY_MOVIES_SMALL,
  BIG_STEP,
  SMALL_STEP,
}