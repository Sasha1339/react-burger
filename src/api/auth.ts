import {HOST_URL} from "../shared/const";
import {HttpError} from "../shared/api/HttpError";
import {AuthResponse, LoginBody, SuccessBody, UpdatedTokenResponse, UserModel, UserResponse} from "../shared/types";


class AuthApi {

  readonly API_URL: string;

  constructor() {
    this.API_URL = `${HOST_URL}/api/auth`;
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
    this.token = this.token.bind(this);
  }

  async getUser(token :string): Promise<UserResponse> {
    const response = await fetch(`${this.API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<UserResponse>;
  };

  async updateUser(token :string): Promise<UserResponse> {
    const response = await fetch(`${this.API_URL}/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<UserResponse>;
  };

  async signIn(body: LoginBody): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<AuthResponse>;
  };

  async signUp(body: UserModel): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<AuthResponse>;
  };

  async logout(token: string): Promise<SuccessBody> {
    const response = await fetch(`${this.API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token})
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<SuccessBody>;
  };

  async token(token: string): Promise<UpdatedTokenResponse> {
    const response = await fetch(`${this.API_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({token})
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<UpdatedTokenResponse>;
  };

}

export const authApi = new AuthApi();