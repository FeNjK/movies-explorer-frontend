class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _ringingServer(res) {
    return res.ok
      ? res.json()
      : Promise.reject(new Error(`${res.status} ${res.statusText}`));
  }

  register({ name, email, password }) { // на сервере контроллер createUser
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  login({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  getUserInfo() { // на сервере контроллер getUserMe
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  editUserInfo({ name, email }) { // на сервере контроллер editUserData
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  getSavedMovies() { // на сервере контроллер getUserMovies
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  saveMovies(movie) { // на сервере контроллер saveMovie
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then((res) => this._ringingServer(res));
  }

  deleteMovies(movieId) { // на сервере контроллер deleteSavedMovie
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  /* toggleLikeCard(movie, isSaved) {
    if (!isSaved) {
      return this.savedMovies(movie);
    } else {
      return this.deleteMovies(movie);
    }
  } */

  signout() { // на сервере контроллер logout
    return fetch(`${this.url}/signout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }
}

const mainApi = new MainApi({
  /* url: 'https://api.find-and-save.nomoredomains.icu', */
  url: 'http://localhost:3000',
  headers: { 'Content-type': 'application/json' },
});

export default mainApi;
