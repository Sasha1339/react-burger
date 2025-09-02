import {FC, useState} from "react";
import {Ingredient} from "../BurgerIngredients/types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientUI.module.css";
import {Modal} from "../Modal/Modal";
import {UnitInfo} from "../UnitInfo/UnitInfo";
import {IngredientsDetails} from "../IngredientsDetails/IngredientsDetails";

type Props = {
  ingredient: Ingredient
}

export const IngredientUI: FC<Props> = ({ingredient, ...props}) => {

  const [visible, setVisible] = useState(false);

  const modal = IngredientsDetails({ingredient, setVisible})

  return (
    <>
      <div className={styles.ingredient} onClick={() => setVisible(true)}>
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
      {visible && modal}
    </>
  )
}