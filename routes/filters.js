
'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const axios = require('axios')
const jwt = require('jsonwebtoken')

router.post('/', (req, res, next) => {
  if (!req.body.filter) { res.status(404).send('must include filter') }
  knex('filters')
    .select('filter')
    .where({
      filter: req.body.filter.toLowerCase()
    })
    .then(data => {
      if (!data[0]) {
        knex('filters')
          .insert({
            filter: req.body.filter.toLowerCase()

          })
          .returning('*')
          .then(data => {
            knex('user_filters')
            .insert({
              filter: req.body.filter.toLowerCase()
              .where()
            })
            res.send(data[0])
          })
      } else {
        res.send('filter already exists')
      }
    })
})

router.get('/', (req, res, next) => {
  knex('filters')
    .then(data => {
      res.send(data)
    })
})

router.delete('/:id', (req, res, next) => {
  return knex('filters')
    .where('id', req.params.id)
    .del('*')
    .then((filters) => {
      if (!filters.length) {
        return next()
      }
      const filter = filters[0]
      // delete filter.id
      res.send(filter)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
