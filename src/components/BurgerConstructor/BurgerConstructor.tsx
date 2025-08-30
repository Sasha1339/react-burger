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
      <div className={styles.content}>
        {ingredients.map((e, index) => (
          <IngredientCardUI key={index} ingredient={e} isLocked={index === 0 || index === ingredients.length - 1} type={index === 0 ? 'top' : index === ingredients.length - 1 ? 'bottom' : undefined}/>
        ))}
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