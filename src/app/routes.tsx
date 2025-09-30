import App from "../App";
import {LoginPage} from "../pages/LoginPage/LoginPage";

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LoginPage />
      },
    ]
  }
];