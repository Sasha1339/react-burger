import {
  FC,
} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

type Props = {}

export const ProtectedRouteElement: FC<Props> = ({ ...props}) => {

  const { user } = useAuth();

  const refreshToken = window.localStorage.getItem('refreshToken');

  return user || refreshToken ? <Outlet /> : <Navigate to={'/login'} replace />
}