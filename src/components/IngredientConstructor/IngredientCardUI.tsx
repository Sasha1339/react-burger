import {FC} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCardUI.module.css";
import {IngredientCard} from "../BurgerConstructor/types";

type Props = {
  ingredient: IngredientCard;
  isLocked?: boolean;
  type?: 'top' | 'bottom'
}

export const IngredientCardUI: FC<Props> = ({ingredient, isLocked, type, ...props}) => {
  return (
    <div className={styles.ingredient}>
      { isLocked ? <div></div> : <DragIcon type="primary" />}
      <ConstructorElement text={ingredient.name} thumbnail={ingredient.image} price={ingredient.price} isLocked={isLocked} type={type}  />
    </div>
  )
}