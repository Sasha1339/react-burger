import {FC, SyntheticEvent, useCallback, useState} from "react";
import styles from "./ResetPasswordPage.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {passwordApi} from "../../api/password";

type Props = {}

export const ResetPasswordPage: FC<Props> = ({...props}) => {

  const navigate = useNavigate();
  const params = useParams();

  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordApi.resetPassword(password, token).then((e) => {
      window.sessionStorage.removeItem('id')
      navigate('/login');
    });
  }, [password, token, navigate])

  if (params['id'] !== window.sessionStorage.getItem('id')) {
    return <Navigate to={'/'} replace />
  }

  return (
    <main className={styles.login}>
      <form className={styles.login_form} onSubmit={onSubmit}>
        <h3>Восстановление пароля</h3>
        <Input type={showIcon ? 'text' : 'password'} icon={showIcon ? 'ShowIcon' : 'HideIcon'}
               onIconClick={() => setShowIcon(!showIcon)} placeholder={'Введите новый пароль'} value={password}
               onChange={(e) => setPassword(e.currentTarget.value)} onPointerEnterCapture={() => {
        }} onPointerLeaveCapture={() => {
        }}/>
        <Input type={'text'}  placeholder={'Введите код из письма'} value={token}
               onChange={(e) => setToken(e.currentTarget.value)} onPointerEnterCapture={() => {
        }} onPointerLeaveCapture={() => {
        }}/>
        <Button htmlType='submit'>
          Сохранить
        </Button>
      </form>

      <div className={styles.login_form}>
        <p className={styles.bottom_text}>Вспомнили пароль? <Link to="/login">Войти</Link></p>
      </div>
    </main>
  )
}