
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_filters').del()
    .then(() => {
      // Inserts seed entries
      return knex('user_filters').insert([
        { id: 1, user_id: 1, filter_id: 1 },
        { id: 2, user_id: 2, filter_id: 2 }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('user_filters_id_seq', (SELECT MAX(id) FROM user_filters));"
      )
    })
}
