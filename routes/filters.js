
'use strict'

let express = require('express')
let router = express.Router()
let knex = require('../knex')
let axios = require('axios')

router.post('/', (req, res, next) => {
  knex('filters')
  .insert({
    filter: req.body.filter.toLowerCase()
  })
    .then(data => {
      res.send(data)
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
