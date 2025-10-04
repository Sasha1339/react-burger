import App from "../App";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {RegisterPage} from "../pages/RegisterPage/RegisterPage";
import {ForgotPasswordPage} from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import {ResetPasswordPage} from "../pages/ResetPasswordPage/ResetPasswordPage";

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ResetPasswordPage />
      },
    ]
  }
];