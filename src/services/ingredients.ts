import {ConstructorIngredient, Ingredient} from "../components/BurgerIngredients/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ingredientApi} from "../api/ingredient";

type IngredientsState = {
  allIngredients: Ingredient[];
  constructorIngredients: {
    upBun?: ConstructorIngredient;
    downBun?: ConstructorIngredient;
    other: ConstructorIngredient[];
  };

  ingredientsRequests: boolean;
  ingredientsFailed: boolean;
}

const initialState: IngredientsState = {
  allIngredients: [],
  constructorIngredients: {
    other: []
  },

  ingredientsRequests: false,
  ingredientsFailed: false,
}

export const getIngredients = createAsyncThunk('ingredients/getIngredients', ingredientApi.getAllIngredients)

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  selectors: {
    ingredients: (state) => state.allIngredients,
    constructorIngredients: (state) => state.constructorIngredients,
    isRequested: (state) => state.ingredientsRequests,
    isFailed: (state) => state.ingredientsFailed
  },
  reducers: {
    deleteIngredientConstruct: (state, action: { payload: ConstructorIngredient }) => {
      const order = action.payload.order!;
      state.constructorIngredients.other = [...state.constructorIngredients.other]
        .filter(e => e.order !== order)
        .map((e) => {
          e.order = e.order! > order ? e.order! - 1 : e.order;
          return e;
        });
    },
    addIngredientInConstruct: (state, action: { payload: ConstructorIngredient }) => {
      const order = action.payload.order;
      if (order) {
        const current = [...state.constructorIngredients.other];
        current.forEach((e) => {
          e.order = e.order! >= order ? e.order!++ : e.order!
        });

        current.push(action.payload)

        state.constructorIngredients.other = [...current.sort((a, b) => a.order! - b.order!)];
      } else {
        const current = [...state.constructorIngredients.other];

        action.payload.order = current.length;

        current.push(action.payload)

        state.constructorIngredients.other = [...current.sort((a, b) => a.order! - b.order!)];
      }

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredientsRequests = true;
        state.ingredientsFailed = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsRequests = false;
        state.ingredientsFailed = false;
        state.allIngredients = action.payload.data;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredientsRequests = false;
        state.ingredientsFailed = true;
        console.log(action.error.message);
      })
  }
})

export {};