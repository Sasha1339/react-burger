import styles from './IngredientsDetails.module.css';
import {FC} from "react";
import {UnitInfo} from "../UnitInfo/UnitInfo";
import {Modal} from "../Modal/Modal";
import {Ingredient} from "../BurgerIngredients/types";

type Props = {
  ingredient: Ingredient;
  setVisible: (isVisible: boolean) => void;
}

export const IngredientsDetails: FC<Props> = ({ingredient, setVisible, ...props }) => {

  return (
    <Modal header="Детали ингредиента" onClose={() => setVisible(false)}>
      <div className={styles.modal_content}>
        <img className={styles.image_modal} src={ingredient.image} alt={ingredient.name}/>
        <div className={styles.title}>{ingredient.name}</div>
        <div className={styles.units}>
          <UnitInfo title='Калории, ккал' amount={ingredient.calories}/>
          <UnitInfo title='Белки, г' amount={ingredient.proteins}/>
          <UnitInfo title='Жиры, г' amount={ingredient.fat}/>
          <UnitInfo title='Углеводы, г' amount={ingredient.carbohydrates}/>
        </div>
      </div>
    </Modal>
  )

}