import {FC, FormEvent, SyntheticEvent, useCallback, useState} from "react";
import styles from "./RegisterPage.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

type Props = {}

export const RegisterPage: FC<Props> = ({...props}) => {

  const [name, setName] = useState<string>('');
  const [showIcon, setShowIcon] = useState<boolean>(false);
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
        <h3>Регистрация</h3>
        <Input type='text' placeholder={'Имя'} value={name} onChange={(e) => setName(e.currentTarget.value)}
               onPointerEnterCapture={() => {
               }} onPointerLeaveCapture={() => {
        }}/>
        <Input type='email' error={!!errorEmail} errorText={errorEmail} placeholder={'E-mail'}
               onInvalid={onInvalidEmail} onInput={() => setErrorEmail(undefined)} value={email}
               onChange={(e) => setEmail(e.currentTarget.value)} onPointerEnterCapture={() => {
        }} onPointerLeaveCapture={() => {
        }}/>
        <Input type={showIcon ? 'text' : 'password'} icon={showIcon ? 'ShowIcon' : 'HideIcon'}
               onIconClick={() => setShowIcon(!showIcon)} placeholder={'Пароль'} value={password}
               onChange={(e) => setPassword(e.currentTarget.value)} onPointerEnterCapture={() => {
        }} onPointerLeaveCapture={() => {
        }}/>
        <Button htmlType='submit'>
          Зарегистрироваться
        </Button>
      </form>

      <div className={styles.login_form}>
        <p className={styles.bottom_text}>Уже зарегистрирован? <Link to="/login">Войти</Link></p>
      </div>
    </main>
  )
}