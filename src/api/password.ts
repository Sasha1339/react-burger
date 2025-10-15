import {HOST_URL} from "../shared/const";
import {HttpError} from "../shared/api/HttpError";
import {SuccessBody} from "../shared/types";


class PasswordApi {

  readonly API_URL: string;

  constructor() {
    this.API_URL = `${HOST_URL}/api/password-reset`;
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async forgotPassword(email: string): Promise<SuccessBody> {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email})
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<SuccessBody>;
  };

  async resetPassword(password: string, token: string): Promise<SuccessBody> {
    const response = await fetch(`${this.API_URL}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({password, token})
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<SuccessBody>;
  };

}

export const passwordApi = new PasswordApi();
