'use strict'

var express = require('express')
var router = express.Router()
let knex = require('../knex')
const { camelizeKeys } = require('humps')

/* GET home page. */
router.post('/', (req, res, next) => {
  knex('filters')
    .then(data => {
      res.send(data)
    })
})

router.delete('/filters/:id', (req, res, next) => {
  return knex('filters')
    .del('*')
    .where('id', req.params.id)
    .then((filters) => {
      if (!filters.length) {
        return next()
      }
      const filter = filters[0]

      delete filter.id
      res.send(camelizeKeys(filter))
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
