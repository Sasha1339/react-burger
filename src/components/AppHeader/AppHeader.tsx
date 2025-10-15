import {FC} from "react";
import {IconLink} from "../IconLink/IconLink";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css"
import {useNavigate} from "react-router-dom";

export const AppHeader: FC = () => {

  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <IconLink icon={<BurgerIcon type='primary'/>} onClick={() => navigate('/')}>Коструктор</IconLink>
        <IconLink icon={<ListIcon type='primary'/>}>Лист заказов</IconLink>
      </nav>

      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.profile}>
        <IconLink icon={<ProfileIcon type='primary'/>} onClick={() => navigate('/profile')}>Личный кабинет</IconLink>
      </div>
    </header>
  )


}