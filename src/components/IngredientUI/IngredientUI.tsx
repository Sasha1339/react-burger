import {FC, useCallback, useEffect} from "react";
import {ConstructorIngredient} from "../BurgerIngredients/types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientUI.module.css";
import {Modal} from "../Modal/Modal";
import {IngredientsDetails} from "../IngredientsDetails/IngredientsDetails";
import {useModal} from "../../hooks/useModal";
import {useDrag} from "react-dnd";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {ingredientsActions} from "../../services/ingredients";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {ingredients} from "../BurgerIngredients/mock";

type Props = {
  ingredient: ConstructorIngredient
}

export const IngredientUI: FC<Props> = ({ingredient,  ...props}) => {

  const dispatch = useAppDispatch();
  const location = useLocation()

  const navigate = useNavigate();

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const onClick = useCallback(() => {
    navigate(`ingredients/${ingredient._id}`, {state: {background: location}})
  }, [dispatch, navigate, ingredient])

  return (
    <>
      {!isDrag && <div ref={dragRef} className={styles.ingredient} onClick={onClick}>
        <div className={styles.counter}>
          {!!ingredient.amount && <Counter count={ingredient.amount!}/>}
        </div>
        <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
        <div className={styles.price}>
          <span>{ingredient.price}</span>
          <CurrencyIcon type='primary'/>
        </div>
        <div className={styles.title}>{ingredient.name}</div>
    </div>}
    </>
  )
}