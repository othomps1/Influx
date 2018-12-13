'use strict'

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([{
        id: 1,
        email: 'Owen@galvanize.com',
        username: 'Owen',
        hashed_password: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      },
      {
        id: 2,
        email: 'Coop@galvanize.com',
        username: 'Cooper',
        hashed_password: '2s7lc44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b930',
      },
      {
        id: 3,
        email: 'kevin@galvanize.com',
        username: 'Kevin',
        hashed_password: 'r5t9c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b110',
      },
      {
        id: 4,
        email: 'Marc@galvanize.com',
        username: 'Marc',
        hashed_password: 'e4f5c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b514',
      }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
    });
};
