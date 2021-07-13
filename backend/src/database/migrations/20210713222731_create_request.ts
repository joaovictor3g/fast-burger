import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('requests', table => {
    table.string('request_id').primary().notNullable();
    table.dateTime('created_at').defaultTo(new Date().toISOString()).notNullable();
    table.string('status').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('requests');
}

