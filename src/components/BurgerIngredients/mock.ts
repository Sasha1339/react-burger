import {Ingredient, IngredientsType} from "./types";
import { default as MockIngredients } from "./__mock__/ingredients.json";
import { default as MockIngredientsCard } from "./__mock__/ingredientsCard.json";
import {IngredientCard} from "../BurgerConstructor/types";

export const ingredients: Ingredient[] = MockIngredients as Ingredient[];

export const ingredientsCard: IngredientCard[] = MockIngredientsCard as IngredientCard[];