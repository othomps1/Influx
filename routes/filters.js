
'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const createUserFilter = (createdFilter, user) =>{
  console.log('createdFilter:',createdFilter,'user:',user)
  return knex('user_filters')
  .insert({
    filter_id: createdFilter.id,
    user_id: user.id
  })
  .returning('*')
}

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
          .then(filterData => {
            const secretkey = process.env.JWT_KEY
            jwt.verify(req.cookies.token, secretkey, (err, decode) => {
              knex('user_filters')
              .select('*')
              .where({
                filter_id: filterData[0].id,
                user_id: decode.id
              })
              .then(record =>{
                if(record[0]){
                  res.send(record[0])
                } else {
                  createUserFilter(filterData[0], decode)
                  .then(userFilter=>{
                      res.send(userFilter[0])
                    })
                }
              })
            })
          })
      } else {
        const secretkey = process.env.JWT_KEY
        jwt.verify(req.cookies.token, secretkey, (err, decode) => {
          knex('user_filters')
          .select('*')
          .where({
            filter_id: data[0].id,
            user_id: decode.id
          })
          .then(record =>{
            if(record[0]){
              res.send(record[0])
            } else {
              createUserFilter(data[0], decode)
              .then(userFilter=>{
                res.send(userFilter[0])
                })
            }
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

router.post('/getID', (req, res, next) => {
  knex('filters')
    .select('filter','id')
    .where('filter', req.body.filter)
    .then(data => {
      res.send(data[0])
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
      res.send(filter)
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  return knex('filters')
    .where('filter', req.params.filterName)
    .del('*')
    .then((filters) => {
      if (!filters.length) {
        return next()
      }
      const filter = filters[0]
      res.send(filter)
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
