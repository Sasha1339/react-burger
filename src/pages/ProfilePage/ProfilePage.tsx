import {FC, FormEvent, SyntheticEvent, useCallback, useState} from "react";
import styles from "./ProfilePage.module.css";
import {Link, Outlet, useLocation, useNavigate, useNavigation} from "react-router-dom";
import {passwordApi} from "../../api/password";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {logout} from "../../services/auth";

type Props = {}

export const ProfilePage: FC<Props> = ({...props}) => {

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const refreshToken = window.localStorage.getItem('refreshToken')

  const onLogout = () => {
    if (refreshToken) {
      dispatch(logout(refreshToken))
      navigate('/login');
    }
  }

  return (
    <main className={styles.profile}>
      <section className={styles.profile_section_left}>
        <h3 className={`${styles.profile_route} ${!location.pathname.includes('orders') && styles.profile_route_active}`} onClick={() => navigate('/profile')}>Профиль</h3>
        <h3 className={`${styles.profile_route} ${location.pathname.includes('orders') && styles.profile_route_active}`} onClick={() => navigate('orders')}>История заказов</h3>
        <h3 className={styles.profile_route}  onClick={onLogout}>Выход</h3>
        <p className={styles.profile_hint}>В этом разделе вы можете изменить свои персональные настройки</p>
      </section>
      <section className={styles.profile_section_center}>
        <Outlet />
      </section>
      <section className={styles.profile_section_right}></section>
    </main>
  )
}