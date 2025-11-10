import {useAppDispatch, useAppSelector} from "./useAppDispatch";
import {authSelectors, getUser, token} from "../services/auth";
import {useEffect} from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector(authSelectors.accessToken);
  const user = useAppSelector(authSelectors.user);
  const authUserRequests = useAppSelector(authSelectors.authUserRequests);
  const authTokenRequests = useAppSelector(authSelectors.authTokenRequests);
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
