import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ingredients', table => {
    table.increments('ingredient_id').primary().notNullable();
    table.string('name').notNullable();
    table.float('price').notNullable();
    table.string('description').notNullable();
    table.integer('amount').notNullable();
    table.string('type').notNullable();
    table.string('image_url', 100000).notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ingredients');
}

