import {FC, useCallback, useRef, useState} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCardUI.module.css";
import {IngredientCard} from "../BurgerConstructor/types";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {ConstructorIngredient, Ingredient, IngredientsType} from "../BurgerIngredients/types";
import {ingredientsActions} from "../../services/ingredients";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useSelector} from "react-redux";

type Props = {
  ingredient: ConstructorIngredient;
  isLocked?: boolean;
  type?: 'top' | 'bottom'
}

export const IngredientCardUI: FC<Props> = ({ingredient, isLocked, type, ...props}) => {

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [hoverPosition, setHoverPosition] = useState<"up" | "down" | null>(null)

  const replaceIngredient = (): ConstructorIngredient => {
    return {...ingredient, moveDrag: true}
  }

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredient',
    item: replaceIngredient(),
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [{ isOver }, otherDrop] = useDrop({
    accept: 'ingredient',
    drop(item: ConstructorIngredient, monitor) {
      if (!ref.current) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY < hoverMiddleY) {
        !item.moveDrag ?
        dispatch(ingredientsActions.addIngredientInConstruct({ ...item, order: ingredient.order }))
        : dispatch(ingredientsActions.moveIngredientConstruct({ ...item, order: ingredient.order }));
      } else {
        !item.moveDrag ?
        dispatch(ingredientsActions.addIngredientInConstruct({ ...item, order: ingredient.order! + 1 }))
        : dispatch(ingredientsActions.moveIngredientConstruct({ ...item, order: ingredient.order! + 1 }));
      }
    },
    hover(item, monitor) {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return

      const middleY = (rect.bottom - rect.top) / 2
      const hoverY = clientOffset.y - rect.top

      setHoverPosition(hoverY < middleY ? "up" : "down")
    },
    collect: (monitor) => ({
        isOver: monitor.isOver() && monitor.getItem().type !== IngredientsType.BUN
    }),
  })

  const getName = useCallback(() => {
    switch (type) {
      case 'top':
        return ingredient.name + ' (верх)';
      case 'bottom':
        return ingredient.name + ' (низ)';
      default:
        return ingredient.name;
    }
  }, [ingredient.name, type])

  const onDelete = useCallback(() => {
    dispatch(ingredientsActions.deleteIngredientConstruct(ingredient))
  }, [ingredient, dispatch]);

  dragRef(otherDrop(ref));

  return (
    <div ref={ingredient.type !== IngredientsType.BUN ? ref : null} className={`${styles.not_user_select} ${isDrag && styles.item_is_drag}`}>
      {isOver && <div className={`${styles.new_ingredient_drop} ${hoverPosition === 'up' && styles.new_ingredient_drop_active}`}>Сделать выше ингредиента {ingredient.name}</div>}
      <div className={styles.ingredient}>
        <>
          { isLocked ? <div></div> : <DragIcon className={styles.cursor_move} type="primary" />}
          <ConstructorElement handleClose={onDelete} extraClass={styles.constructor_ui} text={getName()} thumbnail={ingredient.image} price={ingredient.price} isLocked={isLocked} type={type} />
        </>
      </div>
      {isOver && <div className={`${styles.new_ingredient_drop} ${hoverPosition === 'down' && styles.new_ingredient_drop_active}`}>Сделать ниже ингредиента {ingredient.name}</div>}
    </div>
  )
}
