import {FC} from "react";
import {Ingredient} from "../BurgerIngredients/types";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientUI.module.css";
import {Modal} from "../Modal/Modal";
import {IngredientsDetails} from "../IngredientsDetails/IngredientsDetails";
import {useModal} from "../../hooks/useModal";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import {ingredientsSelectors} from "../../services/ingredients";

type Props = {
  ingredient: Ingredient
}

export const IngredientUI: FC<Props> = ({ingredient,  ...props}) => {

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const { isModalOpen, openModal, closeModal } = useModal();

  const modal = (
    <Modal header="Детали ингредиента" onClose={closeModal}>
      <IngredientsDetails ingredient={ingredient} />
    </Modal>
  )

  return (
    <>
      {!isDrag && <div ref={dragRef} className={styles.ingredient} onClick={openModal}>
        <div className={styles.counter}>
          <Counter count={0}/>
        </div>
        <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
        <div className={styles.price}>
          <span>{ingredient.price}</span>
          <CurrencyIcon type='primary'/>
        </div>
        <div className={styles.title}>{ingredient.name}</div>
    </div>}
      {isModalOpen && modal}
    </>
  )
}