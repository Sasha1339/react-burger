import {FC, useState} from "react";
import {IngredientsType} from "../BurgerIngredients/types";
import styles from "./IngredientNavigation.module.css";

type Props = {
  items: {name: string, type: IngredientsType}[];
}

export const IngredientNavigation: FC<Props> = ({items, ...props}) => {

  const [type, setType] = useState(IngredientsType.BUN);

  return (
    <nav className={styles.navigation}>
      {items.map(e => (
        <div key={e.type} className={`${styles.item} ${e.type === type && styles.active}`}>{e.name}</div>
      ))}
    </nav>
  )

}