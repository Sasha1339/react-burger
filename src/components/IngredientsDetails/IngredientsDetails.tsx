import styles from './IngredientsDetails.module.css';
import {FC, useEffect, useState} from "react";
import {UnitInfo} from "../UnitInfo/UnitInfo";
import {ingredientsSelectors} from "../../services/ingredients";
import {useLocation, useParams} from "react-router-dom";
import {ConstructorIngredient} from "../BurgerIngredients/types";
import {useAppSelector} from "../../hooks/useAppDispatch";

type Props = {}

export const IngredientsDetails: FC<Props> = ({...props}) => {

  const params = useParams()
  const ingredients = useAppSelector(ingredientsSelectors.ingredients);
  const [ingredient, setIngredient] = useState<ConstructorIngredient | undefined>(undefined);

  useEffect(() => {
    const currentIngredient = ingredients.find((e) => e._id === params['id']);
    setIngredient(currentIngredient)
  }, [ingredients]);

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
