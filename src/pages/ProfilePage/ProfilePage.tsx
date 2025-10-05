import {FC, FormEvent, SyntheticEvent, useCallback, useState} from "react";
import styles from "./ProfilePage.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {passwordApi} from "../../api/password";

type Props = {}

export const ProfilePage: FC<Props> = ({...props}) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordApi.forgotPassword(email).then((e) => {
      navigate('/reset-password');
    });
  }, [email, navigate])

  return (
    <main className={styles.profile}>
      <section className={styles.profile_section_left}>
        <h3 className={styles.profile_route}>Профиль</h3>
        <h3 className={styles.profile_route}>История заказов</h3>
        <h3 className={styles.profile_route}>Выход</h3>
        <p className={styles.profile_hint}>В этом разделе вы можете изменить свои персональные настройки</p>
      </section>
      <section className={styles.profile_section_center}>
        <Outlet />
      </section>
      <section className={styles.profile_section_right}></section>
    </main>
  )
}