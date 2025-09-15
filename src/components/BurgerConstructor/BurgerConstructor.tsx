import {FC, PropsWithChildren} from "react";
import styles from "./BurgerConstructor.module.css"
import {IngredientCardUI} from "../IngredientCardUI/IngredientCardUI";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredient, IngredientsType} from "../BurgerIngredients/types";
import {OrderDetails} from "../OrderDetails/OrderDetails";
import {OrderModel} from "../OrderDetails/types";
import {Modal} from "../Modal/Modal";
import {useModal} from "../../hooks/useModal";
import {useDrop} from "react-dnd";
import {useSelector} from "react-redux";
import {ingredientsActions, ingredientsSelectors} from "../../services/ingredients";
import {useAppDispatch} from "../../hooks/useAppDispatch";

type Props = {}

export const BurgerConstructor: FC<PropsWithChildren<Props>> = ({...props}) => {

  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const upBun = useSelector(ingredientsSelectors.upBun);
  const ingredientsWithoutBun = useSelector(ingredientsSelectors.otherIngredients);
  const downBun = useSelector(ingredientsSelectors.downBun);

  const [{isUpBunHover, isNotUpBunHover}, upBunDrop] = useDrop({
    accept: 'ingredient',
    drop(item: Ingredient) {
      item.type === IngredientsType.BUN && dispatch(ingredientsActions.addUpBunConstruct(item))
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
      item.type === IngredientsType.BUN && dispatch(ingredientsActions.addDownBunConstruct(item))
    },
    collect: (monitor) => ({
      isDownBunHover: monitor.isOver() && monitor.getItem().type === IngredientsType.BUN,
      isNotDownBunHover: monitor.isOver() && monitor.getItem().type !== IngredientsType.BUN,
    }),
  })


  const order = {id: 456372} as OrderModel
  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails order={order} />
    </Modal>
  )

  return (
    <div className={styles.ingredients}>
      <div className={styles.components}>
        <div ref={upBunDrop}>
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
        <div ref={downBunDrop} >
        {downBun ? <IngredientCardUI ingredient={downBun} isLocked={true} type={'bottom'}/> :
          <div className={`${styles.ingredient} ${isDownBunHover && styles.ingredient_hover} ${isNotDownBunHover && styles.ingredient_hover_invalid}`}>
            Выберите нижнюю булочку
          </div>
        }
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>
          <span>650</span>
          <CurrencyIcon type='primary'/>
        </div>
        <Button htmlType='button' onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && modal}
    </div>
  )
}