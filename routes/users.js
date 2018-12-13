'use strict'

const express = require('express')
const knex = require('../knex.js')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post('/', (req, res, next) => {
  if(!req.body.username||!req.body.username.trim()){
    next({
      status: 404,
      message: 'must have a username!'
    })
  } else if (!req.body.email||!req.body.email.trim()) {
    next({
      status: 404,
      message: 'must have an email!'
    })
  } else if (!req.body.password||!req.body.password.trim()) {
    next({
      status: 404,
      message: 'must have an password!'
  })}

  req.body.username = req.body.username.toLowerCase()
  req.body.email = req.body.email.toLowerCase()

  return knex('users')
    .where({
      username: req.body.username,
      email: req.body.email
    })
    .first()
    .then((user) => {
      if (user) {res.status(404).send('User already exists')}
      else {
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
        })}
    })


})

router.get('/', (req, res, next) => {
  return knex('users')
    .select('*')
    .where({
      id: req.body.id,
      username: req.body.username,
      email: req.body.email
    })
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
