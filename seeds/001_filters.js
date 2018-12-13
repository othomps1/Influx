
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('filters').del()
    .then(() => {
      // Inserts seed entries
      return knex('filters').insert([
        { id: 1, filter: 'programming'},
        { id: 2, filter: 'tech' },
        { id: 3, filter: 'computer' },
        { id: 4, filter: 'business' },
        { id: 5, filter: 'bitcoin' },
        { id: 6, filter: 'crypto' },
        { id: 7, filter: 'holiday' },
        { id: 8, filter: 'new years' },
        { id: 9, filter: 'colorado' },
        { id: 10, filter: 'galvanize' }
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('filters_id_seq', (SELECT MAX(id) FROM filters));"
      )
    })
}
