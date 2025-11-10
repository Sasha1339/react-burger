import {
  FC,
} from "react";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

type Props = {}

export const ProtectedRouteElement: FC<Props> = ({ ...props}) => {

  const location = useLocation();

  const { user } = useAuth();

  const refreshToken = window.localStorage.getItem('refreshToken');

  return user || refreshToken ? <Outlet /> : <Navigate to={`/login?redirect=${location.pathname}`} replace />
}
