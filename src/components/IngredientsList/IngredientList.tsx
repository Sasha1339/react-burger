import styles from "./IngredientList.module.css"
import {Ingredient} from "../BurgerIngredients/types";
import {FC} from "react";
import {IngredientUI} from "../IngredientUI/IngredientUI";

type Props = {
  items: Ingredient[]
}

export const IngredientList: FC<Props> = ({items, ...props}) => {
  return (
    <div className={styles.list}>
      {items.length > 0 ? items.map(e => <IngredientUI key={e.id} ingredient={e} />) : <p className={styles.notification}>Ингредиенты закончились</p>}
    </div>
  )
}