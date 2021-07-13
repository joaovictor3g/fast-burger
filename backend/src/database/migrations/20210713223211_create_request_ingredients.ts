import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('request_ingredients', table => {
    table.increments('request_ingredients_id').primary().notNullable();
    table.string('request_id').notNullable();
    table.integer('ingredient_id').notNullable();

    table.foreign('request_id').references('requests');
    table.foreign('ingredient_id').references('ingredients');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('request_ingredients');
}

