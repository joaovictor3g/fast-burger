import { Knex } from 'knex';

const ingredients = [
  {
    name: "Pão brioche",
    description: "Uma descrição do pão",
    ingredient_id: 1,
    amount: 2,
    price: 2.5,
    type: "Pão",
  },
  {
    name: "Pão baguette",
    description: "Uma descrição do pão baguette",
    ingredient_id: 2,
    amount: 4,
    price: 4.5,
    type: "Pão",
  },
  {
    name: "Hamburger bovino",
    description: "Uma descrição do hamburger bovino",
    ingredient_id: 3,
    amount: 2,
    price: 2.5,
    type: "Carne",
  },
  {
    name: "Hamburger suíno",
    description: "Uma descrição do hamburger suíno",
    ingredient_id: 4,
    amount: 4,
    price: 4.5,
    type: "Carne",
  },
  {
    name: "Maionese",
    description: "Uma descrição do hamburger bovino",
    ingredient_id: 5,
    amount: 2,
    price: 2.5,
    type: "Molho",
  },
  {
    name: "Ketchup",
    description: "Uma descrição do hamburger suíno",
    ingredient_id: 6,
    amount: 4,
    price: 4.5,
    type: "Molho",
  },
  {
    name: "Mostarda",
    description: "Uma descrição do hamburger suíno",
    ingredient_id: 7,
    amount: 4,
    price: 4.5,
    type: "Molho",
  },
];


export async function seed(knex: Knex) {
  await knex('ingredients').insert(ingredients)
}