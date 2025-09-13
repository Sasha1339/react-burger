import {IngredientCard} from "../BurgerConstructor/types";

export enum IngredientsType {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
}

export interface Ingredient extends IngredientCard {
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  type: IngredientsType;
}

export interface ConstructorIngredient extends Ingredient {
  order?: number
}

export const navigationTypes = [
  {
    name: 'Булки',
    type: IngredientsType.BUN
  },
  {
    name: 'Соусы',
    type: IngredientsType.SAUCE
  },
  {
    name: 'Начинки',
    type: IngredientsType.MAIN
  }
]