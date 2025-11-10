import styles from './OrderDetails.module.css';
import {FC} from "react";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {orderSelectors} from "../../services/order";
import {useAppSelector} from "../../hooks/useAppDispatch";

type Props = {}

export const OrderDetails: FC<Props> = ({...props }) => {

  const orderModel = useAppSelector(orderSelectors.order);

  return (
    <div className={styles.modal_content}>
      {orderModel &&
        <>
        <div className={styles.order_id}>{orderModel.order.number}</div>
        <div className={styles.title}>идентификатор заказа</div>
        <CheckMarkIcon type={'primary'}></CheckMarkIcon>
        <div>
          <div className={styles.info}>Ваш заказ начали готовить</div>
          <div className={styles.hint}>Дождитесь готовности на орбитальной станции</div>
        </div>
      </>
      }
    </div>
  )
}
