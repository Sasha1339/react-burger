import styles from './OrderFeed.module.css';
import {FC} from "react";
import {CheckMarkIcon, CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderFeedModel} from "./types";
import {IngredientFeedCircle} from "../IngredientFeedCircle/IngredientFeedCircle";
import {useNavigate} from "react-router-dom";

type Props = {
  orderModel: OrderFeedModel
}

export const OrderFeed: FC<Props> = ({orderModel, ...props }) => {

  const navigator = useNavigate();

  return (
    <div className={styles.modal_content} onClick={() => {navigator(`${orderModel.id}`)}}>

      <div className={styles.up_data}>
        <div className={styles.order_id}>{`#${orderModel.order.number}`}</div>
        <FormattedDate className={styles.date} date={orderModel.order.date}/>
      </div>

      <div className={styles.title}>
        {orderModel.name}
      </div>

      <div className={styles.down_data}>
        <div className={styles.ingredients}>
          {orderModel.order.ingredients.map((e, i) => (
            <IngredientFeedCircle key={i} name={e.name} url={e.image} translateX={-20 * i}/>
          ))
          }
        </div>
        <div className={styles.price}>
          <span>{orderModel.order.price}</span>
          <CurrencyIcon type='primary'/>
        </div>
      </div>

    </div>
  )
}
