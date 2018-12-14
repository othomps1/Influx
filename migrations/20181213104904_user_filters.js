
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_filters', (table) => {
    table.increments()
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
    table.integer('filter_id').unsigned()
    table.foreign('filter_id').references('filters.id')
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('user_filters')
}
