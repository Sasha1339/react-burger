import styles from "./IngredientList.module.css"
import {Ingredient} from "../BurgerIngredients/types";
import {forwardRef} from "react";
import {IngredientUI} from "../IngredientUI/IngredientUI";

type Props = {
  items: Ingredient[];
}

export const IngredientList = forwardRef<HTMLDivElement, Props>(({items,...props}, ref) => {
  return (
    <div ref={ref} className={styles.list}>
      {items.length > 0 ? items.map(e => <IngredientUI key={e._id} ingredient={e} />) : <p className={styles.notification}>Ингредиенты закончились</p>}
    </div>
  )
});