import {FC, FormEvent, SyntheticEvent, useCallback, useState} from "react";
import styles from "./LoginPage.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

type Props = {}

export const LoginPage: FC<Props> = ({...props}) => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errorEmail, setErrorEmail] = useState<string | undefined>()

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, [])

  const onInvalidEmail = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorEmail('Данные поля не соответствуют форме Email')
  }

  return (
    <main className={styles.login}>
      <form className={styles.login_form} onSubmit={onSubmit}>
        <Input type='email' placeholder={'Email'} error={!!errorEmail} errorText={errorEmail} onInvalid={onInvalidEmail} onInput={() => setErrorEmail(undefined)} value={email} onChange={(e) => setEmail(e.currentTarget.value)} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}  />
        <Input type='password' icon={'HideIcon'} placeholder={'Пароль'} value={password} onChange={(e) => setPassword(e.currentTarget.value)} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}  />
        <Button htmlType='submit'>
          Войти
        </Button>
      </form>

      <div className={styles.login_form}>
        <p className={styles.bottom_text}>Вы - новый пользователь? <Link to="/register">Зарегестрироваться</Link></p>
        <p className={styles.bottom_text}>Забыли пароль? <Link to="/register">Восстановить пароль</Link></p>
      </div>
    </main>
  )
}