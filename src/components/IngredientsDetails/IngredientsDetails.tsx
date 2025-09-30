import styles from './IngredientsDetails.module.css';
import {FC} from "react";
import {UnitInfo} from "../UnitInfo/UnitInfo";
import {useSelector} from "react-redux";
import {ingredientsSelectors} from "../../services/ingredients";

type Props = {}

export const IngredientsDetails: FC<Props> = ({...props}) => {

  const ingredient = useSelector(ingredientsSelectors.currentIngredient);

  return (
    <div className={styles.modal_content}>
      {ingredient &&
        <>
          <img className={styles.image_modal} src={ingredient.image} alt={ingredient.name}/>
          <div className={styles.title}>{ingredient.name}</div>
          <div className={styles.units}>
            <UnitInfo title='Калории, ккал' amount={ingredient.calories}/>
            <UnitInfo title='Белки, г' amount={ingredient.proteins}/>
            <UnitInfo title='Жиры, г' amount={ingredient.fat}/>
            <UnitInfo title='Углеводы, г' amount={ingredient.carbohydrates}/>
          </div>
        </>
      }
    </div>
  )

}