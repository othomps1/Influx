
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments().notNullable()
    table.string('email').notNullable()
    table.string('username').notNullable()
    table.string('hashed_password').notNullable()
    table.timestamps(true,true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
