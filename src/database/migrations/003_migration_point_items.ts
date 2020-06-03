import Knex from 'knex';


export async function up(knex: Knex) {
    return knex.schema.createTable('point_items', (point) => {
        point.increments('id').primary();
        point.integer('point_id').unsigned();
        point.foreign('point_id').references('points.id');
        point.integer('item_id').unsigned();
        point.foreign('item_id').references('items.id')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('point_items');
}