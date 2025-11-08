import styles from './OrderFeed.module.css';
import {FC, useEffect} from "react";
import {CheckMarkIcon, CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderFeedModel} from "./types";
import {IngredientFeedCircle} from "../IngredientFeedCircle/IngredientFeedCircle";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {orderSelectors} from "../../services/order";
import {getIngredients, ingredientsActions, ingredientsSelectors} from "../../services/ingredients";

type Props = {
  id: string;
  onClick: () => void
}

export const OrderFeed: FC<Props> = ({id, onClick, ...props }) => {

  const order = useSelector(orderSelectors.allOrders)?.orders.find((e => e._id === id));

  const ingredients = useSelector(ingredientsSelectors.ingredients)?.filter(e => order?.ingredients.includes(e._id));

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
          {ingredients.filter((e, i) => i < 5).map((e, i) => (
            <IngredientFeedCircle key={i} name={e.name} url={e.image} translateX={-20 * i}/>
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
