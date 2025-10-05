import App from "../App";
import {ProfilePage} from "../pages/ProfilePage/ProfilePage";
import {ProtectedRouteElement} from "../components/ProtectedRouteElement/ProtectedRouteElement";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {RegisterPage} from "../pages/RegisterPage/RegisterPage";
import {ProfileFields} from "../components/ProfileFileds/ProfileFields";
import {ConstructorPage} from "../pages/ConstructorPage/ConstructorPage";
import {ForgotPasswordPage} from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import {ResetPasswordPage} from "../pages/ResetPasswordPage/ResetPasswordPage";
import {IngredientsDetails} from "../components/IngredientsDetails/IngredientsDetails";

export const routes = [
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProtectedRouteElement />,
        children: [
          {
            path: '/',
            element: <ConstructorPage />,
            children: [
              {
                path: 'ingredients/:id',
                element: <IngredientsDetails />,
              },
            ]
          },
          {
            path: 'ingredients/:id',
            element: <IngredientsDetails />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
            children: [
              {
                path: '',
                element: <ProfileFields />,
              },
              {
                path: 'orders',
                element: <LoginPage />,
              },
            ]
          },
        ]
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password/:id',
        element: <ResetPasswordPage />,
      },

    ]
  }
];