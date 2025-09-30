import {HOST_URL} from "../shared/const";
import {HttpError} from "../shared/api/HttpError";
import {Ingredient} from "../components/BurgerIngredients/types";
import {ResponseData} from "../shared/types";

class IngredientApi {

  readonly API_URL: string;

  constructor() {
    console.log(HOST_URL);
    this.API_URL = `${HOST_URL}/api/ingredients`;
    this.getAllIngredients = this.getAllIngredients.bind(this);
    this.getIngredientById = this.getIngredientById.bind(this);
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

  async getIngredientById(id: string): Promise<Ingredient> {
    const response = await fetch(this.API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    if (!response.ok) {
      throw await HttpError.setMessage(response);
    }

    return await response.json() as Promise<Ingredient>;
  };
}

export const ingredientApi = new IngredientApi();
