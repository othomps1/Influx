'use strict'

const express = require('express')
const knex = require('../knex.js')
const bcrypt = require('bcryptjs')

// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/users', (req, res, next) => {
  return knex('users')
    .insert({
      username: req.body.username,
      email: req.body.email,
      hashed_password: bcrypt.hashSync(req.body.password, 1)
    }, '*')
    .then((user) => {
      res.status(200).json({
        id: user[0].id,
        username: user[0].username,
        email: user[0].email
      })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
