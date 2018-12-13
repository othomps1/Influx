
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_filters', (table) => {
    table.increments()
    table.foreign('user_id').references('users.id')
    table.foreign('filter_id').references('filters.id')
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('user_filters')
}
