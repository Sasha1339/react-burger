import {FC, PropsWithChildren, useCallback, useMemo} from "react";
import styles from "./BurgerConstructor.module.css"
import {IngredientCardUI} from "../IngredientCardUI/IngredientCardUI";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient, IngredientsType} from "../BurgerIngredients/types";
import {OrderDetails} from "../OrderDetails/OrderDetails";
import {Modal} from "../Modal/Modal";
import {useModal} from "../../hooks/useModal";
import {useDrop} from "react-dnd";
import {ingredientsActions, ingredientsSelectors} from "../../services/ingredients";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {createOrderRequest, orderActions} from "../../services/order";
import {authSelectors} from "../../services/auth";
import {Link, Navigate, replace, Route, useNavigate} from "react-router-dom";

type Props = {}

export const BurgerConstructor: FC<PropsWithChildren<Props>> = ({...props}) => {

  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const user = useAppSelector(authSelectors.user);
  const accessToken = useAppSelector(authSelectors.accessToken);
  const navigate = useNavigate();
  const ingredients = useAppSelector(ingredientsSelectors.constructorIngredients)
  const upBun = useAppSelector(ingredientsSelectors.upBun);
  const ingredientsWithoutBun = useAppSelector(ingredientsSelectors.otherIngredients);
  const downBun = useAppSelector(ingredientsSelectors.downBun);

  const [{isUpBunHover, isNotUpBunHover}, upBunDrop] = useDrop({
    accept: 'ingredient',
    drop(item: Ingredient) {
      item.type === IngredientsType.BUN && dispatch(ingredientsActions.addUpBunConstruct(item)) && dispatch(ingredientsActions.addDownBunConstruct(item))
    },
    collect: (monitor) => ({
      isUpBunHover: monitor.isOver() && monitor.getItem().type === IngredientsType.BUN,
      isNotUpBunHover: monitor.isOver() && monitor.getItem().type !== IngredientsType.BUN,
    }),
  })

  const [{isOtherHover, isNotOtherHover}, otherDrop] = useDrop({
    accept: 'ingredient',
    drop(item: Ingredient) {
      item.type !== IngredientsType.BUN && dispatch(ingredientsActions.addIngredientInConstruct(item))
    },
    collect: (monitor) => ({
      isOtherHover: monitor.isOver() && monitor.getItem().type !== IngredientsType.BUN,
      isNotOtherHover: monitor.isOver()&& monitor.getItem().type === IngredientsType.BUN,
    }),
  })

  const [{isDownBunHover, isNotDownBunHover}, downBunDrop] = useDrop({
    accept: 'ingredient',
    drop(item: Ingredient) {
      item.type === IngredientsType.BUN && dispatch(ingredientsActions.addDownBunConstruct(item)) && dispatch(ingredientsActions.addUpBunConstruct(item))
    },
    collect: (monitor) => ({
      isDownBunHover: monitor.isOver() && monitor.getItem().type === IngredientsType.BUN,
      isNotDownBunHover: monitor.isOver() && monitor.getItem().type !== IngredientsType.BUN,
    }),
  });

  const onClick = useCallback(() => {
    if (!user) {
      navigate({pathname: '/login', search: '?redirect=/'}, { replace: true});
      return;
    }



    if (ingredients.upBun && ingredients.downBun && accessToken) {
      dispatch(createOrderRequest({ingredients: [ingredients.upBun._id, ...ingredients.other.map(e => e._id), ingredients.downBun._id], accessToken}))
      openModal();
    }


  }, [ingredients, dispatch, openModal, user, navigate]);

  const onClose = useCallback(() => {
    dispatch(orderActions.clearOrder())
    closeModal();
  }, [dispatch, closeModal]);

  const commonPrice = useMemo(() => {
    return (ingredients.upBun?.price ?? 0) + ingredients.other.reduce((a, e) => a + e.price, 0) + (ingredients.downBun?.price ?? 0)
  }, [ingredients])


  const modal = (
    <Modal onClose={onClose}>
      <OrderDetails />
    </Modal>
  )

  return (
    <div className={styles.ingredients}>
      <div className={styles.components}>
        <div className="upBun" ref={upBunDrop}>
        {upBun ? <IngredientCardUI ingredient={upBun} isLocked={true} type={'top'}/> :
          <div className={`${styles.ingredient} ${isUpBunHover && styles.ingredient_hover} ${isNotUpBunHover && styles.ingredient_hover_invalid}`}>
             Выберите верхнюю булочку
          </div>
        }
        </div>
        <div className={styles.content} >
          {ingredientsWithoutBun.length > 0 ? ingredientsWithoutBun.map((e, index) => (
            <IngredientCardUI key={e.ingredientId} ingredient={e}/>
          )) :
            <div  ref={otherDrop} className={`${styles.ingredient} ${isOtherHover && styles.ingredient_hover} ${isNotOtherHover && styles.ingredient_hover_invalid}`}>
              Выберите ингредиенты для вашей булочки
            </div>
          }
        </div>
        <div className="downBun" ref={downBunDrop} >
        {downBun ? <IngredientCardUI ingredient={downBun} isLocked={true} type={'bottom'}/> :
          <div className={`${styles.ingredient} ${isDownBunHover && styles.ingredient_hover} ${isNotDownBunHover && styles.ingredient_hover_invalid}`}>
            Выберите нижнюю булочку
          </div>
        }
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>
          <span>{commonPrice}</span>
          <CurrencyIcon type='primary'/>
        </div>
        <Button htmlType='button' onClick={onClick}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && modal}
    </div>
  )
}
