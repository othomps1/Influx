
'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const axios = require('axios')
const jwt = require('jsonwebtoken')

router.delete('/:userid', (req, res, next) => {
  console.log(req.body)
  return knex('user_filters')
    .where({
      user_id: req.params.userid,
      filter_id: req.body.filterId
    })
    .del('*')
    .then((filters) => {
      res.send(filters[0])
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
