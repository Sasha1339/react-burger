import {FC} from "react";
import styles from "./BurgerConstructor.module.css"
import {IngredientCard} from "./types";
import {IngredientCardUI} from "../IngredientConstructor/IngredientCardUI";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  ingredients: IngredientCard[];
}

export const BurgerConstructor: FC<Props> = ({ingredients, ...props}) => {

  return (
    <div className={styles.ingredients}>
      <div className={styles.components}>
        <IngredientCardUI ingredient={ingredients[0]} isLocked={true} type={'top'}/>
        <div className={styles.content}>
          {ingredients.length > 2 && (ingredients.length > 3 ? ingredients.slice(1, ingredients.length - 2) : [ingredients[1]]).map((e, index) => (
            <IngredientCardUI key={index} ingredient={e}/>
          ))}
        </div>
        <IngredientCardUI ingredient={ingredients[ingredients.length - 1]} isLocked={true} type={'bottom'}/>
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>
          <span>650</span>
          <CurrencyIcon type='primary'/>
        </div>
        <Button htmlType='button'>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}