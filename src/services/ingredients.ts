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
  currentIngredient: Ingredient | null;

  ingredientsRequests: boolean;
  ingredientsFailed: boolean;

  currentIngredientRequests: boolean;
  currentIngredientFailed: boolean;
}

const initialState: IngredientsState = {
  allIngredients: [],
  constructorIngredients: {
    other: []
  },
  currentIngredient: null,

  ingredientsRequests: false,
  ingredientsFailed: false,

  currentIngredientRequests: false,
  currentIngredientFailed: false,
}

export const getIngredients = createAsyncThunk('ingredients/getIngredients', ingredientApi.getAllIngredients)
export const getIngredientById = createAsyncThunk('ingredients/getIngredientById', ingredientApi.getIngredientById)

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  selectors: {
    ingredients: (state) => state.allIngredients,
    constructorIngredients: (state) => state.constructorIngredients,
    upBun: state => state.constructorIngredients.upBun,
    downBun: state => state.constructorIngredients.downBun,
    otherIngredients: state => state.constructorIngredients.other,
    currentIngredient: (state) => state.currentIngredient,
    isRequested: (state) => state.ingredientsRequests,
    isFailed: (state) => state.ingredientsFailed
  },
  reducers: {
    addUpBunConstruct: (state, action: { payload: ConstructorIngredient }) => {
      state.constructorIngredients.upBun = action.payload;
    },
    addDownBunConstruct: (state, action: { payload: ConstructorIngredient }) => {
      state.constructorIngredients.downBun = action.payload;
    },
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
      if (order !== undefined) {
        const current = [];
        [...state.constructorIngredients.other].forEach((e) => {
          current.push({ ...e, order: e.order! >= order ? e.order! + 1 : e.order! })
        });

        current.push(action.payload)

        state.constructorIngredients.other = [...current.sort((a, b) => a.order! - b.order!)];
      } else {
        const current = [...state.constructorIngredients.other];

        const newIngredient = { ...action.payload, order: current.length }

        current.push(newIngredient)

        state.constructorIngredients.other = [...current.sort((a, b) => a.order! - b.order!)];
      }

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientById.pending, (state) => {
        state.currentIngredientRequests = true;
        state.currentIngredientFailed = false;
      })
      .addCase(getIngredientById.fulfilled, (state, action) => {
        state.currentIngredientRequests = false;
        state.currentIngredientFailed = false;
        state.currentIngredient = action.payload;
      })
      .addCase(getIngredientById.rejected, (state, action) => {
        state.currentIngredientRequests = false;
        state.currentIngredientFailed = true;
        console.log(action.error.message);
      })
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

export const { reducer: ingredientsReducer, selectors: ingredientsSelectors, actions: ingredientsActions } = ingredientsSlice;
