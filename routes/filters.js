
'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const axios = require('axios')

router.post('/', (req, res, next) => {
  knex('filters')
    .select('filter')
    .where({
      filter: req.body.filter.toLowerCase()
    })
    .then(data => {
      if (!data) {
        knex('filters')
          .insert({
            filter: req.body.filter.toLowerCase()
          })
          .returning('*')
          .then(data => {
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
