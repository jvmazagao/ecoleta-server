import Knex from 'knex';


export async function up(knex: Knex) {
    return knex.schema.createTable('items', (point) => {
        point.increments('id').unsigned().primary();
        point.string('title').notNullable();
        point.string('image').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}