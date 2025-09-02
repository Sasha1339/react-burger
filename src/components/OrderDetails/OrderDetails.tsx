import styles from './OrderDetails.module.css';
import {FC} from "react";
import {Modal} from "../Modal/Modal";
import {OrderModel} from "./types";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type Props = {
  order: OrderModel,
  setVisible: (isVisible: boolean) => void
}

export const OrderDetails: FC<Props> = ({order, setVisible, ...props }) => {

  return (
    <Modal onClose={() => setVisible(false)}>
      <div className={styles.modal_content}>
        <div className={styles.order_id}>{order.id}</div>
        <div className={styles.title}>идентификатор заказа</div>
        <CheckMarkIcon type={'primary'}></CheckMarkIcon>
        <div>
          <div className={styles.info}>Ваш заказ начали готовить</div>
          <div className={styles.hint}>Дождитесь готовности на орбитальной станции</div>
        </div>
      </div>
    </Modal>
  )

}