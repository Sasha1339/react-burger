import {HOST_URL} from "../shared/const";
import {HttpError} from "../shared/api/HttpError";
import {Ingredient} from "../components/BurgerIngredients/types";
import {ResponseData} from "../shared/types";

class IngredientApi {

  readonly API_URL: string;

  constructor() {
    this.API_URL = `${HOST_URL}/api/ingredients`;
  }

  async getAllIngredients(): Promise<ResponseData<Ingredient>> {
      const response = await fetch(this.API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });

      if (!response.ok) {
        throw await HttpError.setMessage(response);
      }

      return await response.json() as Promise<ResponseData<Ingredient>>;
    };
}

export const ingredientApi = new IngredientApi();
