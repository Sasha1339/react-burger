import {FC, useEffect, useState} from "react";
import styles from "./OrderPage.module.css";
import {IngredientFeedCircle} from "../../components/IngredientFeedCircle/IngredientFeedCircle";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {orderSelectors} from "../../services/order";
import {useParams} from "react-router-dom";
import {ingredientsSelectors} from "../../services/ingredients";
import {ConstructorIngredient} from "../../components/BurgerIngredients/types";

type Props = {}

export const OrderPage: FC<Props> = ({...props}) => {

  const { id } = useParams();

  const order = useSelector(orderSelectors.allOrders)?.orders.find(e => e._id === id)

  const ingredients = useSelector(ingredientsSelectors.ingredients)?.filter(e => order?.ingredients.includes(e._id));

  const [sortedIngredients, setSortedIngredients] = useState<ConstructorIngredient[]>([])

  useEffect(() => {
    if (ingredients?.length > 0) {
      const newSorted = []
      const sorted: Record<string, number> = {}
      ingredients?.forEach(e => {
        if (sorted[e._id]) {
          sorted[e._id] += 1;
        } else {
          sorted[e._id] = 0;
        }
      });

      for (let key in sorted) {
        const find = {...ingredients?.find(e => e._id === key)};
        if (find) {
          find.amount = sorted[key];
          newSorted.push(find);
        }
      }

      setSortedIngredients(newSorted as ConstructorIngredient[]);

    }
  }, []);

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
          {sortedIngredients.map((e, i) => (
            <div key={i} className={styles.ingredient}>
              <IngredientFeedCircle name={e.name} url={e.image}/>
              <div className={styles.text_block_ingredient}>{'Name'}</div>
              <div className={`${styles.number} ${styles.price}`}>
                <span>{`${e.amount} x ${e.price}`}</span>
                <CurrencyIcon type='primary'/>
              </div>
            </div>
          ))}
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
