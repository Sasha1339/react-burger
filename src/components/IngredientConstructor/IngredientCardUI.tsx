import {FC, useCallback} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCardUI.module.css";
import {IngredientCard} from "../BurgerConstructor/types";

type Props = {
  ingredient: IngredientCard;
  isLocked?: boolean;
  type?: 'top' | 'bottom'
}

export const IngredientCardUI: FC<Props> = ({ingredient, isLocked, type, ...props}) => {

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

  return (
    <div className={styles.ingredient}>
      { isLocked ? <div></div> : <DragIcon type="primary" />}
      <ConstructorElement extraClass={styles.constructor_ui} text={getName()} thumbnail={ingredient.image} price={ingredient.price} isLocked={isLocked} type={type}  />
    </div>
  )
}