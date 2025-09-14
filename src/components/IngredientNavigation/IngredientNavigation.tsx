import {FC} from "react";
import {IngredientsType} from "../BurgerIngredients/types";
import styles from "./IngredientNavigation.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  items: {name: string, type: IngredientsType}[];
  onChangeTab: (type: IngredientsType) => void;
  type: IngredientsType;
}

export const IngredientNavigation: FC<Props> = ({items, type, onChangeTab, ...props}) => {

  return (
    <nav className={styles.navigation}>
      {items.map((e, index) => (
        <Tab key={index} active={e.type === type} value={e.name} onClick={() => onChangeTab(e.type)} >{e.name}</Tab>
      ))}
    </nav>
  )

}