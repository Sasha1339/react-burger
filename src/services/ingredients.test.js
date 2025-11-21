import {ingredientsReducer} from "./ingredients";
import {initialState} from "./ingredients";
import {ingredientsActions} from "./ingredients";
import {IngredientsType} from "../components/BurgerIngredients/types";

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-1234')
}));

describe('ingredients reducer', () => {

  it ('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  })

  it ('should handle openIngredientsDetails', () => {
    const mockIngredient = {
      _id: '1',
      name: 'BUN',
      price: 10,
      image: '',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 10,
      type: IngredientsType.BUN,
      amount: 10,
    };

    const result = ingredientsReducer(initialState, ingredientsActions.openIngredientsDetails(mockIngredient));

    expect(result.currentIngredient).toEqual(mockIngredient);
  })

  it ('should handle closeIngredientsDetails', () => {

    const result = ingredientsReducer(initialState, ingredientsActions.closeIngredientsDetails());

    expect(result.currentIngredient).toEqual(null);
  })

  it ('should handle addUpBunConstruct', () => {

    const mockIngredient = {
      _id: '1',
      name: 'BUN',
      price: 10,
      image: '',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 10,
      type: IngredientsType.BUN,
      amount: 10,
      order: 10,
      ingredientId: 'id',
      moveDrag: true,
    };

    const result = ingredientsReducer(initialState, ingredientsActions.addUpBunConstruct(mockIngredient));

    expect(result.constructorIngredients.upBun).toEqual(mockIngredient);
  })

  it ('should handle addDownBunConstruct', () => {

    const mockIngredient = {
      _id: '1',
      name: 'BUN',
      price: 10,
      image: '',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 10,
      type: IngredientsType.BUN,
      amount: 10,
      order: 10,
      ingredientId: 'id',
      moveDrag: true,
    };

    const result = ingredientsReducer(initialState, ingredientsActions.addDownBunConstruct(mockIngredient));

    expect(result.constructorIngredients.downBun).toEqual(mockIngredient);
  });

  it ('should handle addIngredientInConstruct', () => {

    const mockIngredient = {
      _id: '1',
      name: 'BUN',
      price: 10,
      image: '',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 10,
      type: IngredientsType.BUN,
      amount: 10,
      order: 10,
      ingredientId: 'id',
      moveDrag: true,
    };

    const result = ingredientsReducer(initialState, ingredientsActions.addIngredientInConstruct(mockIngredient));

    expect(result.constructorIngredients.other[0]).toEqual(mockIngredient);
  })

})