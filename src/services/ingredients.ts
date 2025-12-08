import {ConstructorIngredient, Ingredient} from "../components/BurgerIngredients/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import {ingredientApi} from "../api/ingredient";

type IngredientsState = {
  allIngredients: ConstructorIngredient[];
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

export const initialState: IngredientsState = {
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
    openIngredientsDetails: (state, action: { payload: Ingredient }) => {
      state.currentIngredient = action.payload;
    },
    closeIngredientsDetails: (state) => {
      state.currentIngredient = null;
    },
    addUpBunConstruct: (state, action: { payload: ConstructorIngredient }) => {
      state.constructorIngredients.upBun = action.payload;
    },
    addDownBunConstruct: (state, action: { payload: ConstructorIngredient }) => {
      state.constructorIngredients.downBun = action.payload;
    },
    deleteIngredientConstruct: (state, action: { payload: ConstructorIngredient }) => {
      const ingredientId = action.payload.ingredientId!;
      const orderItem = action.payload.order!;

      state.constructorIngredients.other = [...state.constructorIngredients.other]
        .filter(e => e.ingredientId !== ingredientId)
        .map((e) => {
          const order = e.order! > orderItem ? e.order! - 1 : e.order;
          return {...e, order};
        });

      const allIngredients = [...state.allIngredients];

      allIngredients.filter((e) => e._id === action.payload._id).forEach((ingredient) => {
        ingredient.amount = ingredient.amount! - 1;
      });

      state.allIngredients = [...allIngredients];
    },
    moveIngredientConstruct: (state, action: { payload: ConstructorIngredient }) => {
      const order = action.payload.order!;

      const current: ConstructorIngredient[] = [];
      [...state.constructorIngredients.other].forEach((e) => {
        if (e.ingredientId !== action.payload.ingredientId) {
          current.push({ ...e, order: e.order! >= order ? e.order! + 1 : e.order!})
        } else {
          current.push({...e, order: order, moveDrag: false});
        }
      });

      state.constructorIngredients.other = [...current.sort((a, b) => a.order! - b.order!)];
    },
    addIngredientInConstruct: (state, action: { payload: ConstructorIngredient }) => {
      const order = action.payload.order;
      const allIngredients = [...state.allIngredients];

      allIngredients.filter((e) => e._id === action.payload._id).forEach((ingredient) => {
        ingredient.amount = ingredient.amount ? ingredient.amount + 1 : 1;
      });

      state.allIngredients = [...allIngredients];

      if (order !== undefined) {
        const current: ConstructorIngredient[] = [];
        [...state.constructorIngredients.other].forEach((e) => {
          current.push({ ...e, order: e.order! >= order ? e.order! + 1 : e.order!})
        });

        current.push({...action.payload, ingredientId: action.payload.ingredientId ?? uuidv4()})

        state.constructorIngredients.other = [...current.sort((a, b) => a.order! - b.order!)];
      } else {
        const current = [...state.constructorIngredients.other];

        const newIngredient = { ...action.payload, order: current.length, ingredientId: uuidv4() }

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

