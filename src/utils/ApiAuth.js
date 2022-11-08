class ApiAuth {
  constructor(options) {
    this._url = options.url;
  }

  _headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

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

  register({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  autorise({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }

  getEmail(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then((res) => this._ringingServer(res));
  }
}

const apiAuth = new ApiAuth({
  /* url: 'https://api.find-and-save.nomoredomains.icu', */
  url: 'http://localhost:3000',
});

export default apiAuth;
