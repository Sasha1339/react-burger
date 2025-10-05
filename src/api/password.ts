import {HOST_URL} from "../shared/const";
import {HttpError} from "../shared/api/HttpError";
import {SuccessResetPasswordBody} from "../shared/types";


class PasswordApi {

  readonly API_URL: string;

  constructor() {
    this.API_URL = `${HOST_URL}/api/password-reset`;
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async forgotPassword(email: string): Promise<SuccessResetPasswordBody> {
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

    return await response.json() as Promise<SuccessResetPasswordBody>;
  };

  async resetPassword(password: string, token: string): Promise<SuccessResetPasswordBody> {
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

    return await response.json() as Promise<SuccessResetPasswordBody>;
  };

}

export const passwordApi = new PasswordApi();