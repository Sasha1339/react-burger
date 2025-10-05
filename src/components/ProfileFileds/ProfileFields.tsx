import {FC, FormEvent, SyntheticEvent,KeyboardEvent, useCallback, useEffect, useRef, useState} from "react";
import styles from "./ProfileFields.module.css";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {authSelectors} from "../../services/auth";

type Props = {}

export const ProfileFields: FC<Props> = ({...props}) => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const profile = useSelector(authSelectors.user)

  const [name, setName] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showName, setShowName] = useState<boolean>(false);
  const [showEmail, setShowEmail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errorEmail, setErrorEmail] = useState<string | undefined>()

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowName(false);
    setShowPassword(false);
    setShowEmail(false);
  }, [name, email, password, setShowName, setShowPassword, setShowEmail]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setPassword(profile.password);
    }
  }, [profile]);

  const onInvalidEmail = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorEmail('Данные поля не соответствуют форме Email')
  }

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      const valid = formRef.current?.checkValidity();
      formRef.current?.requestSubmit();
    }
  }, []);

  return (
    <aside className={styles.login} onKeyDown={onKeyDown}>
      <form ref={formRef} className={styles.login_form} onSubmit={onSubmit}>
        <Input type='text' placeholder={'Имя'} icon={'EditIcon'} value={name} onIconClick={() => setShowName(!showName)}
               disabled={!showName}
               onChange={(e) => setName(e.currentTarget.value)} onPointerEnterCapture={() => {
        }} onPointerLeaveCapture={() => {
        }}/>
        <Input type='email' placeholder={'Логин'} error={!!errorEmail} errorText={errorEmail} icon={'EditIcon'}
               onInvalid={onInvalidEmail} onInput={() => setErrorEmail(undefined)} value={email}
               disabled={!showEmail}
               onIconClick={() => setShowEmail(!showEmail)}
               onChange={(e) => setEmail(e.currentTarget.value)} onPointerEnterCapture={() => {
        }} onPointerLeaveCapture={() => {
        }}/>
        <Input type='password' placeholder={'Пароль'} icon={'EditIcon'} value={password}
               disabled={!showPassword}
               onIconClick={() => setShowPassword(!showPassword)}
               onChange={(e) => setPassword(e.currentTarget.value)} onPointerEnterCapture={() => {
        }} onPointerLeaveCapture={() => {
        }}/>
      </form>
    </aside>
  )
}