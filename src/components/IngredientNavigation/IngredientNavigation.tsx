import {FC, useState} from "react";
import {IngredientsType} from "../BurgerIngredients/types";
import styles from "./IngredientNavigation.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  items: {name: string, type: IngredientsType}[];
}

export const IngredientNavigation: FC<Props> = ({items, ...props}) => {

  const [type, setType] = useState(IngredientsType.BUN);

  return (
    <nav className={styles.navigation}>
      {items.map(e => (
        <Tab active={e.type === type} value={e.name} onClick={() => setType(e.type)} >{e.name}</Tab>
      ))}
    </nav>
  )

}