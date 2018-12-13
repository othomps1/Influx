
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('filters').del()
    .then(() => {
      // Inserts seed entries
      return knex('filters').insert([
        { id: 1, filter: '' },
        { id: 2, filter: '' }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('filters_id_seq', (SELECT MAX(id) FROM filters));"
      )
    })
}
