import {ConstructorIngredient} from "../BurgerIngredients/types";

export interface OrderFeedModel {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrdersFeedModel {
  orders: OrderFeedModel[]
  total: number;
  totalToday: number;
  success: boolean
}