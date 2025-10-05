import {HOST_URL} from "../shared/const";
import {HttpError} from "../shared/api/HttpError";
import {ProfileModel} from "../shared/types";


class ProfileApi {

  readonly API_URL: string;

  constructor() {
    this.API_URL = `${HOST_URL}/api/auth/user`;
    this.getProfile = this.getProfile.bind(this);
  }

  async getProfile(): Promise<ProfileModel> {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<ProfileModel>;
  };

}

export const profileApi = new ProfileApi();