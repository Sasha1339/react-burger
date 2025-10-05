import {useAppDispatch} from "./useAppDispatch";
import {useSelector} from "react-redux";
import {authSelectors, getUser, token} from "../services/auth";
import {useEffect} from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const accessToken = useSelector(authSelectors.accessToken);
  const user = useSelector(authSelectors.user);
  const authUserRequests = useSelector(authSelectors.authUserRequests);
  const authTokenRequests = useSelector(authSelectors.authTokenRequests);
  const refreshToken = window.localStorage.getItem("refreshToken");

  useEffect(() => {
      if (!accessToken && !refreshToken) return;

      try {
        if (accessToken && !user) {
          dispatch(getUser(accessToken));
          return;
        }

        if (!accessToken && refreshToken) {
          dispatch(token(refreshToken));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
  }, [accessToken, user, refreshToken, dispatch]);

  return { user, accessToken, authUserRequests, authTokenRequests };
};