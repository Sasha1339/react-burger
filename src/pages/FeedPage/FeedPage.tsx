import {FC} from "react";
import styles from "./FeedPage.module.css";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {OrderFeed} from "../../components/OrderFeed/OrderFeed";
import {dateOrders, orders} from "./__mock__/feed";
import {FeedCommonInfo} from "../../components/FeedCommonInfo/FeedCommonInfo";

type Props = {}

export const FeedPage: FC<Props> = ({...props}) => {

  const navigator = useNavigate();

  const location = useLocation();

  return (
    <main className={styles.main}>
        <div className={styles.header}>Лента заказов</div>
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.feed}>
            {orders.map((e, i) => (
              <OrderFeed key={i} orderModel={e} onClick={() => {navigator(`${e.id}`, {state: {background: location}})}} />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <FeedCommonInfo {...dateOrders} />
        </section>
        </div>
    </main>
  )
}
