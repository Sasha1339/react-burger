import {FC, useEffect, useRef} from "react";
import styles from "./ProfileOrders.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {orderSelectors} from "../../services/order";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {socketActions} from "../../services/actions/socket";
import {OrderFeed} from "../OrderFeed/OrderFeed";
import {authSelectors} from "../../services/auth";


type Props = {}

export const ProfileOrders: FC<Props> = ({...props}) => {

  const allOrders = useAppSelector(orderSelectors.allUserOrders)

  const navigator = useNavigate();

  const location = useLocation();

  const ref = useRef<HTMLElement>(null)

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(authSelectors.accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(socketActions.startConnection())
    }

    return () => {dispatch(socketActions.closeConnection())}
  }, [accessToken]);


  if (!allOrders?.orders) {
    return null;
  }

  return (
    <aside ref={ref} className={styles.feed}>
      {allOrders.orders.slice().reverse().map((e, i) => (
        <OrderFeed key={e._id} id={e._id} selector={'user'} onClick={() => {
          navigator(`${e.number}`, {state: {background: location}})
        }}/>
      ))}
    </aside>
  )
}
