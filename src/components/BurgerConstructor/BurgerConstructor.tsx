import {FC, useEffect, useState} from "react";
import styles from "./BurgerConstructor.module.css"
import {IngredientCardUI} from "../IngredientCardUI/IngredientCardUI";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient, IngredientsType} from "../BurgerIngredients/types";
import {OrderDetails} from "../OrderDetails/OrderDetails";
import {OrderModel} from "../OrderDetails/types";

type Props = {
  ingredients: Ingredient[];
}

export const BurgerConstructor: FC<Props> = ({ingredients, ...props}) => {

  const [visible, setVisible] = useState(false);

  const [ingredientsWithoutBun, setIngredientsWithoutBun] = useState<Ingredient[]>([]);
  const [upBun, setUpBun] = useState<Ingredient | undefined>(undefined);
  const [downBun, setDownBun] = useState<Ingredient | undefined>(undefined);

  useEffect(() => {
    let updatedUpBun: Ingredient | undefined;
    let updatedDownBun: Ingredient | undefined;
    const updatedIngredients: Ingredient[] = []

    ingredients.forEach((e) => {
      if (e.type === IngredientsType.BUN && !updatedUpBun) {
        updatedUpBun = e;
        return;
      }

      if (e.type === IngredientsType.BUN && !updatedDownBun) {
        updatedDownBun = e;
        return;
      }

      if (e.type !== IngredientsType.BUN) {
        updatedIngredients.push(e);
      }
    });

    setUpBun(updatedUpBun);
    setDownBun(updatedDownBun);
    setIngredientsWithoutBun(updatedIngredients);
  }, [ingredients]);

  const order = {id: 456372} as OrderModel
  const modal = OrderDetails({order, setVisible})

  return (
    <div className={styles.ingredients}>
      <div className={styles.components}>
        {upBun && <IngredientCardUI ingredient={upBun} isLocked={true} type={'top'}/>}
        <div className={styles.content}>
          {ingredientsWithoutBun.map((e, index) => (
            <IngredientCardUI key={index} ingredient={e}/>
          ))}
        </div>
        {downBun && <IngredientCardUI ingredient={downBun} isLocked={true} type={'bottom'}/>}
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>
          <span>650</span>
          <CurrencyIcon type='primary'/>
        </div>
        <Button htmlType='button' onClick={() => setVisible(true)}>
          Оформить заказ
        </Button>
      </div>
      {visible && modal}
    </div>
  )
}