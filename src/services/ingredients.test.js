import {ingredientsReducer} from "./ingredients";
import {initialState} from "./ingredients";
import {ingredientsActions} from "./ingredients";
import {IngredientsType} from "../components/BurgerIngredients/types";


const mockIngredientShared = {
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
}

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-1234')
}));

describe('ingredients reducer', () => {

  it ('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  })

  it ('should handle openIngredientsDetails', () => {
    const mockIngredient = mockIngredientShared;

    const result = ingredientsReducer(initialState, ingredientsActions.openIngredientsDetails(mockIngredient));

    expect(result.currentIngredient).toEqual(mockIngredient);
  })

  it ('should handle closeIngredientsDetails', () => {

    const result = ingredientsReducer(initialState, ingredientsActions.closeIngredientsDetails());

    expect(result.currentIngredient).toEqual(null);
  })

  it ('should handle addUpBunConstruct', () => {

    const mockIngredient = {
      ...mockIngredientShared,
      order: 10,
      ingredientId: 'id',
      moveDrag: true,
    };

    const result = ingredientsReducer(initialState, ingredientsActions.addUpBunConstruct(mockIngredient));

    expect(result.constructorIngredients.upBun).toEqual(mockIngredient);
  })

  it ('should handle addDownBunConstruct', () => {

    const mockIngredient = {
      ...mockIngredientShared,
      order: 10,
      ingredientId: 'id',
      moveDrag: true,
    };

    const result = ingredientsReducer(initialState, ingredientsActions.addDownBunConstruct(mockIngredient));

    expect(result.constructorIngredients.downBun).toEqual(mockIngredient);
  });

  it ('should handle addIngredientInConstruct', () => {

    const mockIngredient = {
      ...mockIngredientShared,
      order: 10,
      ingredientId: 'id',
      moveDrag: true,
    };

    const result = ingredientsReducer(initialState, ingredientsActions.addIngredientInConstruct(mockIngredient));

    expect(result.constructorIngredients.other[0]).toEqual(mockIngredient);
  })

  it ('should handle deleteIngredientConstruct', () => {

    const mockIngredient = {
      ...mockIngredientShared,
      order: 10,
      ingredientId: 'id',
      moveDrag: true,
    };

    const initState = {...initialState, constructorIngredients: {other: [mockIngredient]}}

    const result = ingredientsReducer(initState, ingredientsActions.deleteIngredientConstruct(mockIngredient));

    expect(result.constructorIngredients.other).toEqual([]);
  })

  it ('should handle moveIngredientConstruct', () => {

    const mockIngredient1 = {
      ...mockIngredientShared,
      _id: "1",
      order: 1,
      ingredientId: 'first',
      moveDrag: true,
    };

    const mockIngredient2 = {
      ...mockIngredientShared,
      _id: "2",
      order: 2,
      ingredientId: 'second',
      moveDrag: true,
    };


    const initState = {...initialState, constructorIngredients: {other: [mockIngredient1, mockIngredient2]}}

    const result = ingredientsReducer(initState, ingredientsActions.moveIngredientConstruct({...mockIngredient2, order: mockIngredient1.order}));

    console.log(result);

    expect(result.constructorIngredients.other[0].ingredientId).toEqual('second');
  })

})