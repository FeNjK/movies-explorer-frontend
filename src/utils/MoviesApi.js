class MoviesApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _ringingServer(res) {
    return res.ok
      ? res.json()
      : Promise.reject(
          new Error(
            `Ошибка
            ${res.status}
          : ${res.statusText}`
          )
        );
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._ringingServer(res));
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co',
  headers: { 'Content-Type': 'application/json' },
});

export default moviesApi;