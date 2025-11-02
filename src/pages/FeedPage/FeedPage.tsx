import {FC} from "react";
import styles from "./FeedPage.module.css";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {authSelectors} from "../../services/auth";
import {BurgerConstructor} from "../../components/BurgerConstructor/BurgerConstructor";
import {OrderFeed} from "../../components/OrderFeed/OrderFeed";
import {dateOrders, orders} from "./__mock__/feed";
import {FeedCommonInfo} from "../../components/FeedCommonInfo/FeedCommonInfo";

type Props = {}

export const FeedPage: FC<Props> = ({...props}) => {


  return (
    <main className={styles.main}>
        <div className={styles.header}>Лента заказов</div>
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.feed}>
            {orders.map((e, i) => (
              <OrderFeed key={i} orderModel={e} />
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
