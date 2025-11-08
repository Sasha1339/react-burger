import {FC, FormEvent, SyntheticEvent, useCallback, useEffect, useState} from "react";
import styles from "./LoginPage.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {authSelectors, signIn} from "../../services/auth";
import {useSelector} from "react-redux";

type Props = {}

export const LoginPage: FC<Props> = ({...props}) => {

  const dispatch = useAppDispatch();

  const user = useSelector(authSelectors.user);
  const refreshToken = window.localStorage.getItem('refreshToken');

  const [email, setEmail] = useState<string>('');
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const [errorEmail, setErrorEmail] = useState<string | undefined>()

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn({ email, password }))
  }, [email, password, dispatch])


  const onInvalidEmail = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorEmail('Данные поля не соответствуют форме Email')
  }

  return (
    user ? <Navigate to={'/'} replace /> : <main className={styles.login}>

      <form className={styles.login_form} onSubmit={onSubmit}>
        <h3>Вход</h3>
        <Input type='email' placeholder={'E-mail'} error={!!errorEmail} errorText={errorEmail}
               onInvalid={onInvalidEmail} onInput={() => setErrorEmail(undefined)} value={email}
               onChange={(e) => setEmail(e.currentTarget.value)}   onPointerEnterCapture={() => {}}
               onPointerLeaveCapture={() => {}}/>
        <Input type={showIcon ? 'text' : 'password'} icon={showIcon ? 'ShowIcon' : 'HideIcon'}
               onIconClick={() => setShowIcon(!showIcon)} placeholder={'Пароль'} value={password}
               onChange={(e) => setPassword(e.currentTarget.value)}   onPointerEnterCapture={() => {}}
               onPointerLeaveCapture={() => {}}/>
        <Button htmlType='submit'>
          Войти
        </Button>
      </form>

      <div className={styles.login_form}>
        <p className={styles.bottom_text}>Вы - новый пользователь? <Link to="/register">Зарегестрироваться</Link></p>
        <p className={styles.bottom_text}>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
      </div>
    </main>
  )
}
