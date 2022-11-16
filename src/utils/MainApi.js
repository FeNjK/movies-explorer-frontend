class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _ringingServer(res) {
    return res.ok
      ? res.json()
      : Promise.reject(
          new Error(
            `${res.status} ${res.statusText}`
          )
        );
  }

  register({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  login({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  getToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, about }),
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }
}

const mainApi = new MainApi({
  /* url: 'https://api.find-and-save.nomoredomains.icu', */
  url: 'http://localhost:3000',
});

export default mainApi;
