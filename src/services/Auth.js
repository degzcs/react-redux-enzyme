class Auth {
  constructor() {
    this.autenticated = false;
  }

  getToken() {
    return this.constructor.existSession() ? JSON.parse(localStorage.getItem('session')).token : '';
  }

  getClient() {
    if (this.constructor.existSession()) {
      const session = JSON.parse(localStorage.getItem('session'));
      return {
        username: session.name,
        name: session.client,
        id: session.clientId,
        avatar: session.avatarUri,
      };
    }
    this.clearAndExit();
    return {};
  }

  static existSession() {
    return localStorage.getItem('session') !== undefined && localStorage.getItem('session') !== null;
  }

  login(callback, error) {
    console.log('Verify session...');
    if (localStorage.getItem('session')) {
      this.autenticated = true;
      console.log('return callback...');
      return callback();
    }
    this.autenticated = false;
    console.log('return error...');
    return error();
  }

  logout(callback) {
    this.clearAndExit();
    callback();
  }

  clearAndExit() {
    localStorage.clear();
    this.autenticated = false;
    window.location.href = '#/login';
  }

  isAuthenticated() {
    return this.autenticated;
  }
}

export default new Auth();
