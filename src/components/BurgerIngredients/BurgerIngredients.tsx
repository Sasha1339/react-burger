import {FC} from "react";
import {Ingredient, IngredientsType, navigationTypes} from "./types";
import {IngredientList} from "../IngredientsList/IngredientList";
import styles from "./BurgerIngredients.module.css";
import {IngredientNavigation} from "../IngredientNavigation/IngredientNavigation";

type Props = {
  ingredients: Ingredient[];
}

export const BurgerIngredients: FC<Props> = ({ingredients, ...props}) => {

  const buns = ingredients.filter((e) => e.type === IngredientsType.BUN)
  const sauces = ingredients.filter((e) => e.type === IngredientsType.SAUCE)
  const fillings = ingredients.filter((e) => e.type === IngredientsType.FILLING)

  return (
    <div className={styles.ingredients}>
      <h1>Соберите бургер</h1>
      <div>
        <IngredientNavigation items={navigationTypes} />
      </div>
      <div className={styles.content}>
        <h2>Булки</h2>
        <IngredientList items={buns}/>
        <h2>Соусы</h2>
        <IngredientList items={sauces}/>
        <h2>Начинки</h2>
        <IngredientList items={fillings}/>
      </div>
    </div>
  )
}