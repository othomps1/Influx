
exports.up = function(knex, Promise) {
  return knex.schema.createTable('filters', (table) => {
    table.increments()
    table.text('filter').notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('filters')
}
