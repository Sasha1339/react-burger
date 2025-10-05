import {FC, FormEvent, SyntheticEvent, useCallback, useState} from "react";
import styles from "./ForgotPasswordPage.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {passwordApi} from "../../api/password";

type Props = {}

export const ForgotPasswordPage: FC<Props> = ({...props}) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');

  const [errorEmail, setErrorEmail] = useState<string | undefined>()

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordApi.forgotPassword(email).then((e) => {
      navigate('/reset-password');
    });
  }, [email, navigate])

  const onInvalidEmail = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorEmail('Данные поля не соответствуют форме Email')
  }

  return (
    <main className={styles.login}>
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