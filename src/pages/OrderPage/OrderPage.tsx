import {FC, useEffect, useMemo, useState} from "react";
import styles from "./OrderPage.module.css";
import {IngredientFeedCircle} from "../../components/IngredientFeedCircle/IngredientFeedCircle";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {orderSelectors} from "../../services/order";
import {useParams} from "react-router-dom";
import {ingredientsSelectors} from "../../services/ingredients";
import {useAppSelector} from "../../hooks/useAppDispatch";

type Props = {}

export const OrderPage: FC<Props> = ({...props}) => {

  const { id } = useParams();

  const order = useAppSelector(orderSelectors.allOrders)?.orders.find(e => e._id === id);

  const ingredients = useAppSelector(ingredientsSelectors.ingredients);
  const isRequested = useAppSelector(ingredientsSelectors.isRequested);

  const ingredientsSorted = useMemo(() => {

    const sorted: Record<string, number> = {}

    order?.ingredients.forEach((e) => {
      if (sorted[e]) {
        sorted[e] += 1;
      } else {
        sorted[e] = 1;
      }
    })

    return sorted;

  }, [order]);

  if (!order || (ingredients?.length < 1)) {
    return null;
  }

  return (
    <main className={styles.order}>
      <div className={`${styles.block_order_center} ${styles.number}`}>{`#${order.number}`}</div>
      <div className={styles.block_order}>
        <div className={styles.text_block}>{ingredients[0].name}</div>
        <div className={styles.status_block}>{order.status === 'done' ? 'Выполнен' : 'В процессе'}</div>
      </div>
      <div className={styles.block_order}>
        <div className={styles.text_block}>Состав:</div>
        <div className={styles.ingredients}>
          {Object.entries(ingredientsSorted).map((e, i) => {

            const ingredient = ingredients.find(i => i._id === e[0]);

            if (!ingredient) {
              return null;
            }

            return (
            <div key={i} className={styles.ingredient}>
              <IngredientFeedCircle name={ingredient.name} url={ingredient.image}/>
              <div className={styles.text_block_ingredient}>{ingredient.name}</div>
              <div className={`${styles.number} ${styles.price}`}>
                <span>{`${(e[1])} x ${ingredient.price}`}</span>
                <CurrencyIcon type='primary'/>
              </div>
            </div>
          )})}
        </div>

      </div>
      <div className={styles.block_order_row}>
        <FormattedDate className={styles.date} date={new Date(order.updatedAt)}/>
        <div className={`${styles.number} ${styles.price}`}>
          <span>{ingredients?.reduce((a, e) => a + e.price, 0)}</span>
          <CurrencyIcon type='primary'/>
        </div>
      </div>
    </main>
  )
}
