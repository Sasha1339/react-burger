import {FC, FormEvent, SyntheticEvent, useCallback, useState} from "react";
import styles from "./ForgotPasswordPage.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {passwordApi} from "../../api/password";
import {useAuth} from "../../hooks/useAuth";
import {v4 as uuidv4} from "uuid";
import {useSelector} from "react-redux";
import {authSelectors} from "../../services/auth";

type Props = {}

export const ForgotPasswordPage: FC<Props> = ({...props}) => {

  const navigate = useNavigate();

  const user = useSelector(authSelectors.user);
  const refreshToken = window.localStorage.getItem('refreshToken');

  const [email, setEmail] = useState<string>('');

  const [errorEmail, setErrorEmail] = useState<string | undefined>()

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordApi.forgotPassword(email).then((e) => {
      const id = uuidv4();
      window.sessionStorage.setItem('id', id);
      navigate(`/reset-password/${id}`);
    });
  }, [email, navigate])

  const onInvalidEmail = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorEmail('Данные поля не соответствуют форме Email')
  }

  if (user) {
    return (<Navigate to={'/'} replace />)
  }

  return (
    user || refreshToken ? <Navigate to={'/constructor'} replace /> : <main className={styles.login}>
      <form className={styles.login_form} onSubmit={onSubmit}>
        <h3>Восстановление пароля</h3>
        <Input type='email' placeholder={'E-mail'} error={!!errorEmail} errorText={errorEmail}
               onInvalid={onInvalidEmail} onInput={() => setErrorEmail(undefined)} value={email}
               onChange={(e) => setEmail(e.currentTarget.value)} onPointerEnterCapture={() => {
        }} onPointerLeaveCapture={() => {
        }}/>
        <Button htmlType='submit'>
          Восстановить
        </Button>
      </form>

      <div className={styles.login_form}>
        <p className={styles.bottom_text}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
      </div>
    </main>
  )
}