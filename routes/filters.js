
'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const axios = require('axios')
const jwt = require('jsonwebtoken')

router.post('/', (req, res, next) => {
  if (!req.body['filter']) { res.status(404).send('must include filter')}
  knex('filters')
    .select('filter','id')
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
            const secretkey = process.env.JWT_KEY
            jwt.verify(req.cookies.token, secretkey, (err, decode) => {
              knex('user_filters')
              .insert({
                filter_id: data[0].id,
                user_id: decode.id
              })
              .returning('*')
              .then(user_filter=>{
                console.log(user_filter[0])
                res.send(data[0])
              })
            })
          })
      } else {
        const secretkey = process.env.JWT_KEY
        jwt.verify(req.cookies.token, secretkey, (err, decode) => {
          knex('user_filters')
          .insert({
            filter_id: data[0].id,
            user_id: decode.id
          })
          .returning('*')
          .then(user_filter=>{
            console.log(user_filter[0])
            res.send(data[0])
          })
        })
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
