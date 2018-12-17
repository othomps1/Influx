
'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const axios = require('axios')
const jwt = require('jsonwebtoken')

router.post('/', (req, res, next) => {
  let keyword = req.body.filter
  let sortBy = req.body.sortBy || 'relevancy'
  let source = req.body.source? `&sources=${req.body.source}` : ''
  let language = req.body.language? `&lang=${req.body.source}` : ''
  axios.get(`https://newsapi.org/v2/everything?q=${keyword.replace(/[ ]+/g, " OR ")}${source}${language}&sortBy=${sortBy}&apiKey=${process.env.APIKEY}`)
  .then(result=>{
    res.json(result.data)
  })
  .catch(err=>{
    res.send({
      status: 404,
      message: "No results for that search"
    })
  })
})

module.exports = router
