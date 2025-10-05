export interface ResponseData<DataType> {
  success: boolean;
  data: DataType[]
}

export interface SuccessResetPasswordBody {
  success: boolean;
  message: string;
}

export interface ProfileModel {
  name: string;
  email: string;
  password: string;
}
