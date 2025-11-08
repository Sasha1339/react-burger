import styles from './OrderFeed.module.css';
import {FC, useEffect} from "react";
import {CheckMarkIcon, CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderFeedModel} from "./types";
import {IngredientFeedCircle} from "../IngredientFeedCircle/IngredientFeedCircle";
import {orderSelectors} from "../../services/order";
import {ingredientsSelectors} from "../../services/ingredients";
import {useAppSelector} from "../../hooks/useAppDispatch";

type Props = {
  id: string;
  onClick: () => void
}

export const OrderFeed: FC<Props> = ({id, onClick, ...props }) => {

  const ingredients = useAppSelector(ingredientsSelectors.ingredients);

  const order = useAppSelector(orderSelectors.allOrders)?.orders.find((e => e._id === id));

  if (!order || (ingredients?.length < 1)) {
    return null;
  }

  return (
    <div className={styles.modal_content} onClick={onClick}>

      <div className={styles.up_data}>
        <div className={styles.order_id}>{`#${order.number}`}</div>
        <FormattedDate className={styles.date} date={new Date(order.updatedAt)}/>
      </div>

      <div className={styles.title}>
        {ingredients[0].name}
      </div>

      <div className={styles.down_data}>
        <div className={styles.ingredients}>
          {order.ingredients.filter((e, i) => i < 5)
            .map(e => ingredients?.find(i => i._id === e))
            .map((e, i) => (
              (e && <IngredientFeedCircle key={i} name={e.name} url={e.image} translateX={-20 * i}/>)
          ))
          }
        </div>
        <div className={styles.price}>
          <span>{ingredients?.reduce((a, e) => a + e.price, 0)}</span>
          <CurrencyIcon type='primary'/>
        </div>
      </div>

    </div>
  )
}
