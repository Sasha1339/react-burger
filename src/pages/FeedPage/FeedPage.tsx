import {FC, useEffect} from "react";
import styles from "./FeedPage.module.css";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {OrderFeed} from "../../components/OrderFeed/OrderFeed";
import {FeedCommonInfo} from "../../components/FeedCommonInfo/FeedCommonInfo";
import {useSelector} from "react-redux";
import {orderSelectors} from "../../services/order";
import {getIngredients, ingredientsSelectors} from "../../services/ingredients";
import {useAppDispatch} from "../../hooks/useAppDispatch";

type Props = {}

export const FeedPage: FC<Props> = ({...props}) => {

  const navigator = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const orders = useSelector(orderSelectors.allOrders)
  const ordersReady = useSelector(orderSelectors.allReadyOrders)
  const ordersInProcess = useSelector(orderSelectors.allInProcessOrders)

  const ingredients = useSelector(ingredientsSelectors.ingredients)

  useEffect(() => {
    if (ingredients.length < 1) {
      dispatch(getIngredients())
    }
  }, []);


  if (!orders || ingredients.length < 1) {
    return null;
  }

  return (
    <main className={styles.main}>
        <div className={styles.header}>Лента заказов</div>
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.feed}>
            {orders?.orders.map((e, i) => (
              <OrderFeed key={i} id={e._id} onClick={() => {navigator(`${e._id}`, {state: {background: location}})}} />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <FeedCommonInfo ready={ordersReady?.map((e) => e.number) ?? []} inProcess={ordersInProcess?.map(e => e.number) ?? []} today={orders.totalToday} allTimes={orders.total} />
        </section>
        </div>
    </main>
  )
}
