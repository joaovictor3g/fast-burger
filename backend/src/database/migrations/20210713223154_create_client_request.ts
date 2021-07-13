import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('client_requests', table => {
    table.increments('client_request_id').primary().notNullable();
    table.string('client_id').notNullable();
    table.string('request_id').notNullable();

    table.foreign('client_id').references('client_id').inTable('clients');
    table.foreign('request_id').references('request_id').inTable('requests');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('client_requests');
}

