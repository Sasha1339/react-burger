export enum IngredientsType {
  BUN = 'BUN',
  SAUCE = 'SAUCE',
  FILLING = 'FILLING',
}

export type Ingredient = {
  id: string;
  name: string;
  price: number;
  image: string;
  amount: number;
  type: IngredientsType;
}

export const navigationTypes = [
  {
    name: 'Булки',
    type: IngredientsType.BUN
  },
  {
    name: 'Соусы',
    type: IngredientsType.SAUCE
  },
  {
    name: 'Начинки',
    type: IngredientsType.FILLING
  }
]