import {FC} from "react";
import styles from "./OrderPage.module.css";
import {logout} from "../../services/auth";
import {order, orders} from "../FeedPage/__mock__/feed";
import {IngredientFeedCircle} from "../../components/IngredientFeedCircle/IngredientFeedCircle";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {}

export const OrderPage: FC<Props> = ({...props}) => {

  const orderModel = order;


  return (
    <main className={styles.order}>
      <div className={`${styles.block_order_center} ${styles.number}`}>{`#${orderModel.order.number}`}</div>
      <div className={styles.block_order}>
        <div className={styles.text_block}>{orderModel.name}</div>
        <div className={styles.status_block}>{orderModel.status === 'ready' ? 'Выполнен' : 'В процессе'}</div>
      </div>
      <div className={styles.block_order}>
        <div className={styles.text_block}>Состав:</div>
        <div className={styles.ingredients}>
          {orderModel.order.ingredients.map((e, i) => (
            <div className={styles.ingredient}>
              <IngredientFeedCircle name={e.name} url={e.image}/>
              <div className={styles.text_block_ingredient}>{e.name}</div>
              <div className={`${styles.number} ${styles.price}`}>
                <span>{`${e.amount} x ${e.price}`}</span>
                <CurrencyIcon type='primary'/>
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className={styles.block_order_row}>
        <FormattedDate className={styles.date} date={orderModel.order.date}/>
        <div className={`${styles.number} ${styles.price}`}>
          <span>{orderModel.order.price}</span>
          <CurrencyIcon type='primary'/>
        </div>
      </div>
    </main>
  )
}
