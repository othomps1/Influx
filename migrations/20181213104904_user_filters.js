
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_filters', (table) => {
    table.increments()
<<<<<<< HEAD
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id')
    table.integer('filter_id').unsigned()
    table.foreign('filter_id').references('filters.id')
=======
    table.integer('filter_id').unsigned()
    table.foreign('filter_id').references('id')
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('id')
>>>>>>> 878882246c937e52b826ed87428a5bb3ea84bd33
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('user_filters')
}
