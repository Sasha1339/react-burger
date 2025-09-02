import {FC, useEffect, useState} from "react";
import {ingredientService} from "../api/ingredient.service";
import {Ingredient} from "../components/BurgerIngredients/types";

type Props = {
  ingredients: Ingredient[];
}

export const withIngredients = (WrappedComponent: FC<Props>) => ({...props}) => {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    ingredientService.getAllIngredients().then((response) => {
      setIngredients(response.data);
    })
  }, []);

  return (
    <WrappedComponent {...props} ingredients={ingredients} />
  )
}