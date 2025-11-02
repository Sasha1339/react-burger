import {FC} from "react";
import styles from "./ProfileOrders.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {orders} from "../../pages/FeedPage/__mock__/feed";
import {OrderFeed} from "../OrderFeed/OrderFeed";

type Props = {}

export const ProfileOrders: FC<Props> = ({...props}) => {

  const navigator = useNavigate();

  const location = useLocation()

  return (
    <aside className={styles.feed}>
      {orders.map((e, i) => (
        <OrderFeed key={i} orderModel={e} onClick={() => {
          navigator(`${e.id}`, {state: {background: location}})
        }}/>
      ))}
    </aside>
  )
}
