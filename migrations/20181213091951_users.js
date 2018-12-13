'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments().notNullable()
    table.string('email').notNullable().defaultTo('')
    table.text('username').notNullable().defaultTo('')
    table.text('hashed_password').notNullable().defaultTo('')
    table.timestamps(true,true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
