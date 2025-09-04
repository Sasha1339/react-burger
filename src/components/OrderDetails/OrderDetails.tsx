import styles from './OrderDetails.module.css';
import {FC} from "react";
import {OrderModel} from "./types";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  order: OrderModel
}

export const OrderDetails: FC<Props> = ({order, ...props }) => {

  return (
    <div className={styles.modal_content}>
      <div className={styles.order_id}>{order.id}</div>
      <div className={styles.title}>идентификатор заказа</div>
      <CheckMarkIcon type={'primary'}></CheckMarkIcon>
      <div>
        <div className={styles.info}>Ваш заказ начали готовить</div>
        <div className={styles.hint}>Дождитесь готовности на орбитальной станции</div>
      </div>
    </div>
  )

}