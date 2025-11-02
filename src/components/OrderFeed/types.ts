import {ConstructorIngredient} from "../BurgerIngredients/types";

export interface OrderFeedModel {
  id: number;
  name: string;
  order: {
    number: number;
    ingredients: ConstructorIngredient[];
    price: number;
    date: Date;
  }
  status?: 'ready' | 'in_process'
}
