import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('points', (point) => {
        point.increments('id').unsigned().primary();
        point.string('name').notNullable();
        point.string('image').notNullable();
        point.string('email').notNullable();
        point.string('city').notNullable();
        point.string('whatsapp').notNullable();
        point.string('uf', 2).notNullable();
        point.string('longitude').notNullable();
        point.string('latitude').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('points');
}