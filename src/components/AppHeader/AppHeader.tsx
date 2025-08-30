import {FC} from "react";
import {IconLink} from "../IconLink/IconLink";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css"

export const AppHeader: FC = () => {

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <IconLink icon={<BurgerIcon type='primary'/>}>Коструктор</IconLink>
        <IconLink icon={<ListIcon type='primary'/>}>Лист заказов</IconLink>
      </nav>

      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.profile}>
        <IconLink icon={<ProfileIcon type='primary'/>}>Личный кабинет</IconLink>
      </div>
    </header>
  )


}