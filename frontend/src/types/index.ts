export type Ingredient = {
  ingredient_id: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  type: string;
};

export type ParsedIngredients = {
  type: string;
  ingOptions: Ingredient[];
}[];
