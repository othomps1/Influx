
'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const axios = require('axios')
const jwt = require('jsonwebtoken')

router.post('/', (req, res, next) => {
  let keyword = req.body.filter
  // console.log(keyword)
  axios.get(`https://newsapi.org/v2/everything?q=${keyword.replace(/[ ]+/g, " OR ")}&sortBy=relevancy&apiKey=${process.env.APIKEY}`)
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
