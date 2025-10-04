import {FC, SyntheticEvent, useCallback, useState} from "react";
import styles from "./ResetPasswordPage.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

type Props = {}

export const ResetPasswordPage: FC<Props> = ({...props}) => {

  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordSecond, setPasswordSecond] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string | undefined>()

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordSecond !== password) {
      setErrorPassword('Пароли не совпадают');
      return;
    }
  }, [password, passwordSecond])

  return (
    <main className={styles.login}>
      <form className={styles.login_form} onSubmit={onSubmit}>
        <h3>Восстановление пароля</h3>
        <Input type={showIcon ? 'text' : 'password'} errorText={errorPassword}  error={!!errorPassword} icon={showIcon ? 'ShowIcon' : 'HideIcon'}
               onIconClick={() => setShowIcon(!showIcon)} onInput={(e) => setErrorPassword(undefined)} placeholder={'Введите новый пароль'} value={password}
               onChange={(e) => setPassword(e.currentTarget.value)} onPointerEnterCapture={() => {
        }} onPointerLeaveCapture={() => {
        }}/>
        <Input type={'password'}  placeholder={'Введите новый пароль еще раз'} value={passwordSecond} onInput={() => setErrorPassword(undefined)}
               onChange={(e) => setPasswordSecond(e.currentTarget.value)} onPointerEnterCapture={() => {
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