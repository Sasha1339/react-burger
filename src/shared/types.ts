export interface ResponseData<DataType> {
  success: boolean;
  data: DataType[]
}

export interface SuccessBody {
  success: boolean;
  message: string;
}

export interface UserModel {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  success: boolean,
  user: {
    email: string;
    name: string;
  }
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  }
}

export interface UpdatedTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
