
'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const axios = require('axios')
const jwt = require('jsonwebtoken')

router.post('/', (req, res, next) => {
  if (!req.body.filter) { res.status(404).send('must include filter')}
  let filterToAdd = req.body.filter.toLowerCase().replace(/[\.\/,$#%^*()@&?:;\-+=_!~`"]+/g, "").trim("")
  knex('filters')
    .select('filter','id')
    .where({
      filter: filterToAdd
    })
    .then(data => {
      if (!data[0]) {
        knex('filters')
          .insert({
            filter: filterToAdd
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
                console.log(data[0])
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
            console.log(data[0])
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
