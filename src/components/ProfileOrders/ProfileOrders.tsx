import {FC, useEffect, useRef} from "react";
import styles from "./ProfileOrders.module.css";
import {useLocation, useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";
import {orderSelectors} from "../../services/order";
import {getIngredients, ingredientsSelectors} from "../../services/ingredients";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {socketActions} from "../../services/actions/socket";
import {OrderFeed} from "../OrderFeed/OrderFeed";

import gsap from 'gsap'


type Props = {}

export const ProfileOrders: FC<Props> = ({...props}) => {

  const allOrders = useSelector(orderSelectors.allUserOrders)

  const navigator = useNavigate();

  const location = useLocation();

  const ref = useRef<HTMLElement>(null)

  const ingredients = useSelector(ingredientsSelectors.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(socketActions.startConnection());
    if (ingredients?.length < 1) {
      dispatch(getIngredients())
    }
  }, []);


  if (!allOrders?.orders) {
    return null;
  }

  return (
    <aside ref={ref} className={styles.feed}>
      {allOrders.orders.slice().reverse().map((e, i) => (
        <OrderFeed key={i} id={e._id} onClick={() => {
          navigator(`${e._id}`, {state: {background: location}})
        }}/>
      ))}
    </aside>
  )
}
