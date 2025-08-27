import {FC} from "react";
import {Ingredient} from "../../components/BurgerIngredients/types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientUI.module.css";

type Props = {
  ingredient: Ingredient
}

export const IngredientUI: FC<Props> = ({ingredient, ...props}) => {
  return (
    <div className={styles.ingredient}>
      <img className={styles.image} src={ingredient.image} alt='Здесь должна быть картинка'/>
      <div className={styles.price}>
        <span>{ingredient.price}</span>
        <CurrencyIcon type='primary'/>
      </div>
      <div className={styles.title}>{ingredient.name}</div>
    </div>
  )
}