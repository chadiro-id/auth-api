const LoginUserUseCase = require('../../../../Applications/use_case/LoginUserUseCase');
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/RefreshAuthenticationUseCase');
const LogoutUserUseCase = require('../../../../Applications/use_case/LogoutUserUseCase');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    const { username, password } = request.payload;

    // VALIDASI: property harus ada
    if (!username || !password) {
      throw new InvariantError('harus mengirimkan username dan password');
    }
    // VALIDASI: tipe data harus string
    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new InvariantError('username dan password harus string');
    }

    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
    const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request) {
    const { refreshToken } = request.payload;

    // VALIDASI: property harus ada
    if (!refreshToken) {
      throw new InvariantError('harus mengirimkan token refresh');
    }
    // VALIDASI: tipe data harus string
    if (typeof refreshToken !== 'string') {
      throw new InvariantError('refresh token harus string');
    }

    const refreshAuthenticationUseCase = this._container
      .getInstance(RefreshAuthenticationUseCase.name);
    const accessToken = await refreshAuthenticationUseCase.execute(request.payload);

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    const { refreshToken } = request.payload;

    // VALIDASI: property harus ada
    if (!refreshToken) {
      throw new InvariantError('harus mengirimkan token refresh');
    }
    // VALIDASI: tipe data harus string
    if (typeof refreshToken !== 'string') {
      throw new InvariantError('refresh token harus string');
    }

    const logoutUserUseCase = this._container.getInstance(LogoutUserUseCase.name);
    await logoutUserUseCase.execute(request.payload);
    return {
      status: 'success',
    };
  }
}

module.exports = AuthenticationsHandler;
