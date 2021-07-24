export type Ingredient = {
  ingredient_id: number;
  name: string;
  price: number;
  description: string;
  amount: number;
  type: string;
  image_url: string;
};

export type ParsedIngredients = {
  type: string;
  ingOptions: Ingredient[];
}[];

export type HistoricRequests = {
  success: boolean;
  name: string;
  count: number;
  data: {
    ingredient_id: number;
    name: string;
    price: number;
    description: string;
    amount: number;
    type: string;
    request_id: number;
    created_at: Date;
    status: string;
  }[]
}