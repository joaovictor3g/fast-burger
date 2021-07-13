import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('clients', table => {
    table.string('client_id').primary().notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('clients');
}

