export enum IngredientsType {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
}

export type Ingredient = {
  _id: string;
  name: string;
  price: number;
  image: string;
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
    type: IngredientsType.MAIN
  }
]