import {FC} from "react";
import {Ingredient} from "../BurgerIngredients/types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientUI.module.css";

type Props = {
  ingredient: Ingredient
}

export const IngredientUI: FC<Props> = ({ingredient, ...props}) => {
  return (
    <div className={styles.ingredient}>
      <div className={styles.counter}>
        <Counter count={0}/>
      </div>
      <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
      <div className={styles.price}>
        <span>{ingredient.price}</span>
        <CurrencyIcon type='primary'/>
      </div>
      <div className={styles.title}>{ingredient.name}</div>
    </div>
  )
}